import httpx
from urllib.parse import quote


async def generate_thumbnail(prompt: str, style_prompt: str, headshot_url: str) -> bytes:
    """
    Generate a thumbnail using Pollinations AI.
    headshot_url is currently unused because Pollinations
    doesn't support reference images.
    """

    full_prompt = f"""
    {style_prompt}

    {prompt}

    Professional YouTube thumbnail.
    High quality.
    Cinematic lighting.
    YouTube style.
    16:9 aspect ratio.
    Ultra detailed.
    """

    url = (
        "https://image.pollinations.ai/prompt/"
        + quote(full_prompt)
        + "?width=1536&height=1024&model=flux"
    )

    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.get(url)

    response.raise_for_status()

    return response.content