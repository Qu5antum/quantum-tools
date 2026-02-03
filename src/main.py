from fastapi import FastAPI, HTTPException, status
from src.config import settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi import BackgroundTasks
from src.service import searching_videos, downloading_videos
from fastapi.responses import StreamingResponse
from pathlib import Path
from src.remove_file import remove_file
from urllib.parse import quote
from fastapi import BackgroundTasks 

app = FastAPI(
    title="Save What You Love",
    description="Downloader",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search/")
async def search_videos(search_query: str):
    return await searching_videos(search_query)
     

@app.get("/downloads")
async def get_download(
    url: str,
    background_tasks: BackgroundTasks,
    format: str = "mp4",
    video_quality: int = 720,
    audio_bitrate: int = 320,
):
    filename = await downloading_videos(
        url=url,
        format=format,
        video_quality=video_quality,
        audio_bitrate=audio_bitrate
    )

    file_size = filename.stat().st_size
    safe_filename = quote(filename.name)

    def iterfile():
        with filename.open("rb") as f:
            while chunk := f.read(1024 * 1024):
                yield chunk

    background_tasks.add_task(remove_file, filename)

    return StreamingResponse(
        iterfile(),
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f"attachment; filename*=UTF-8''{safe_filename}",
            "Content-Length": str(file_size),
        },
        background=background_tasks,
    )
     
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="127.0.0.1", port=8000, reload=True)
