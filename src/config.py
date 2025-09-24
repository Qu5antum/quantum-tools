from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    API_KEY: str

    model_config=SettingsConfigDict(env_file="src/.env")


settings = Settings()