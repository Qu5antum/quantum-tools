from aiohttp import ClientSession

class YouTubeClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://www.googleapis.com/youtube/v3"

    async def search(self, query: str, max_results: int = 10):
        async with ClientSession() as session:
            params = {
                "part": "snippet",
                "q": query,
                "type": "video",
                "maxResults": max_results,
                "key": self.api_key
            }
            async with session.get(f"{self.base_url}/search", params=params) as resp:
                return await resp.json()
