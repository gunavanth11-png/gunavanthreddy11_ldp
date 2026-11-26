"""Load local configuration from a .env file without exposing secrets."""

from pathlib import Path
from os import getenv

from dotenv import dotenv_values, load_dotenv


ENV_FILE = Path(__file__).with_name(".env")


def main() -> None:
    if not ENV_FILE.is_file():
        print(f"No .env file found at {ENV_FILE}. Copy .env.example to .env to try this.")
        return

    # Keep values already provided by the shell or deployment environment.
    load_dotenv(ENV_FILE, override=False)
    file_values = dotenv_values(ENV_FILE)

    app_environment = getenv("APP_ENV", file_values.get("APP_ENV", "development"))
    api_key_is_configured = bool(getenv("SERVICE_API_KEY", file_values.get("SERVICE_API_KEY")))

    print(f"Application environment: {app_environment}")
    print(f"Service API key configured: {api_key_is_configured}")


if __name__ == "__main__":
    main()
