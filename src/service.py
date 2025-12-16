from fastapi import HTTPException, status
from fastapi.responses import StreamingResponse
from pathlib import Path
from src.remove_file import remove_file
from urllib.parse import quote
import yt_dlp
from src.config import settings
from src.http_client import YouTubeClient
 

DOWNLOAD_DIR = Path("downloads")
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

youTube_client = YouTubeClient(api_key=settings.API_KEY)

async def searching_videos(search_query: str):
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Ошибка запроса: {e}")
    

async def downloading_videos(
        url: str,
        format: str,
        video_quality: int,
        audio_bitrate: int,
)-> Path:
    try:
        COOKIE_PATH = Path("/etc/secrets/youtube.com_cookies.txt")
        output_template = DOWNLOAD_DIR / "%(title)s.%(ext)s"
        
        if format == "mp3":
            ydl_opts = {
                "outtmpl": str(output_template),
                "format": "bestaudio/best",
                "cookiefile": str(COOKIE_PATH),
                "no_write_cookies": True,
                "writecookies": False,     
                "quiet": True,
                "no_warnings": True,
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
                "no_write_cookies": True,    
                "writecookies": False, 
                "quiet": True,
                "no_warnings": True,
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
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Файл не найден")
        
        return filename

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Download failed!")