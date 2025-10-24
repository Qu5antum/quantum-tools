from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pathlib import Path
from urllib.parse import quote
import yt_dlp
from src.config import settings
from src.http_client import YouTubeClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi import BackgroundTasks

app = FastAPI(
    title="Save What You Love",
    description="Downloader",
    version="1.0"
)
origins = [
    "https://quantum-tools-999c8.web.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DOWNLOAD_DIR = Path("downloads")
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

youTube_client = YouTubeClient(api_key=settings.API_KEY)

async def remove_file(path: Path):
    try:
        path.unlink()  # удаляем файл
    except Exception as e:
        print(f"Ошибка при удалении файла: {e}")

@app.get("/search/")
async def search_videos(search_query: str):
    try:
        data = await youTube_client.search(search_query)
        if "items" not in data or not data["items"]:
            return {"results": []}

        results = []
        for item in data["items"]:
            video_id = item["id"]["videoId"]
            title = item["snippet"]["title"]
            results.append({
                "title": title,
                "video_url": f"https://www.youtube.com/watch?v={video_id}"
            })

        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка запроса: {e}")

@app.get("/downloads")
async def get_download(url: str, background_tasks: BackgroundTasks, format: str = "mp4", video_quality: int = 720, audio_bitrate: int = 320):
    try:
        COOKIE_PATH = Path(__file__).parent / "youtube.com_cookies.txt"
        output_template = DOWNLOAD_DIR / "%(title)s.%(ext)s"
        
        if format == "mp3":
            ydl_opts = {
                "outtmpl": str(output_template),
                "format": "bestaudio/best",
                "cookiefile": str(COOKIE_PATH),
                "postprocessors": [{
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": str(audio_bitrate),
                }]
            }
        elif format == "mp4":
            ydl_opts = {
                "outtmpl": str(output_template),
                "format": f"bestvideo[height<={video_quality}]+bestaudio/best",
                "merge_output_format": "mp4",
                "cookiefile": str(COOKIE_PATH),
                "postprocessors": [{
                    "key": "FFmpegVideoConvertor",
                    "preferedformat": "mp4"
                }],
            }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = Path(ydl.prepare_filename(info))
            filename = filename.with_suffix(f".{format}")  # меняем расширение

        if not filename.exists():
            raise HTTPException(status_code=404, detail="Файл не найден")

        file_size = filename.stat().st_size
        safe_filename = quote(filename.name)

        def iterfile(path: Path):
            with path.open("rb") as file:
                while chunk := file.read(1024 * 1024):
                    yield chunk

        # Добавляем задачу на удаление файла после отправки
        background_tasks.add_task(remove_file, filename)

        return StreamingResponse(
            iterfile(filename),
            media_type="application/octet-stream",
            headers={
                "Content-Disposition": f"attachment; filename*=UTF-8''{safe_filename}",
                "Content-Length": str(file_size)
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000)
