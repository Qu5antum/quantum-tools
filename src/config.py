from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    API_KEY: str
    origins: list[str] = ["https://quantum-tools-999c8.web.app"]
    model_config=SettingsConfigDict(env_file="src/.env")


settings = Settings()