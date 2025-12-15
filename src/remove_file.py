from pathlib import Path
from fastapi import BackgroundTasks 

async def remove_file(path: Path):
    try:
        path.unlink()  # удаляем файл
    except Exception as e:
        print(f"Ошибка при удалении файла: {e}")


    
    
