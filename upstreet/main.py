import subprocess
from dotenv import load_dotenv
import os
from events import Events

load_dotenv()

headless = os.getenv("HEADLESS") == "true"
muted = os.getenv("MUTED") == "true"

def install_playwright():
    """
    Installs the Playwright package and its dependencies.

    Raises:
        subprocess.CalledProcessError: If the installation process fails.
    """
    try:
        subprocess.run(["pip", "install", "playwright"], check=True)
        subprocess.run(["playwright", "install"], check=True)
    except subprocess.CalledProcessError as e:
        print("Failed to install Playwright:", e)
        raise

try:
    from playwright.async_api import async_playwright
except ImportError:
    install_playwright()
    from playwright.async_api import async_playwright


class Agent:
    """
    Represents an autonomous agent that interacts with a web page through Playwright.

    Attributes:
        browser (Browser): The browser instance used to interact with the web page.
        page (Page): The page instance used to interact with the web page.
    """

    def __init__(self):
        """Initializes the Agent with default values."""
        self.browser = None
        self.page = None
        self.ready = False
        self.events = Events()

    async def connect(self) -> bool:
        """
        Asynchronously connects to the agent through a Chromium browser.

        Returns:
            bool: True if the connection is successful, False otherwise.
        """
        if self.browser:
            print("Already connected to agent. Skipping connection.")
            return True
        try:
            p = await async_playwright().start()
            self.browser = await p.chromium.launch(headless=headless, args=["--mute-audio"] if muted else [])
            self.page = await self.browser.new_page()
            await self.page.goto("https://upstreet.ai/g/")
            await self.page.expose_function("engineLoaded", lambda: setattr(self, "ready", True))
            
            async def read_chat(
                playerName, playerId, command, commandArgument, message
            ):
                """Callback function to read chat messages."""
                # Assuming an emit method on self
                self.events.on_event(
                    "message",
                    {
                        "playerName": playerName,
                        "playerId": playerId,
                        "command": command,
                        "commandArgument": commandArgument,
                        "message": message,
                    },
                )

            await self.page.expose_function("receiveChat", read_chat)
            return True
        except Exception as error:
            print("An error occurred while connecting:", error)
            return False

    async def disconnect(self):
        """
        Asynchronously disconnects from the agent and closes the browser.
        """
        if not self.browser:
            print("Not connected to agent. Skipping disconnection.")
        else:
            try:
                await self.browser.close()
            except Exception as error:
                print("An error occurred while disconnecting:", error)
        self.page = None
        self.browser = None

    async def check_connection(self) -> bool:
        """
        Asynchronously checks if the agent is connected.

        Returns:
            bool: True if connected, False otherwise.
        """
        if not self.browser:
            print("Not connected to agent. Skipping message.")
            return False
        if not self.page:
            print("The page was closed in the browser. Skipping message.")
            return False
        if self.ready is False:
            print("The agent is not ready. Skipping message.")
            return False
        return True

    async def send_message(
        self, command: str, commandArgument: str = None, message: str = None
    ):
        """
        Asynchronously sends a message to the agent.

        Args:
            command (str): The command to send.
            commandArgument (str, optional): Additional argument for the command. Defaults to None.
            message (str, optional): The message content. Defaults to None.
        """
        if not await self.check_connection():
            return
        await self.page.evaluate(
            """({ command, commandArgument, message }) => {
            if (!globalThis.sendChat) {
                console.warn('The globalThis.sendChat function does not exist. Skipping message.');
                return;
            }
            return globalThis.sendChat({ command, commandArgument, message });
        }""",
            {
                "command": command,
                "commandArgument": commandArgument,
                "message": message,
            },
        )

    async def speak(self, message):
        """
        Asynchronously sends a SPEAK command with the given message.

        Args:
            message (str): The message to speak.
        """
        await self.send_message("SPEAK", message=message)

    async def emote(self, emote):
        """
        Asynchronously sends an EMOTE command with the given emote.

        Args:
            emote (str): The emote to send.
        """
        await self.send_message("EMOTE", commandArgument=emote)

    async def send_message_with_emote(self, emote, message):
        """
        Asynchronously sends a message with an accompanying emote.

        Args:
            emote (str): The emote to send.
            message (str): The message content.
        """
        await self.send_message("EMOTE", commandArgument=emote, message=message)

    async def set_emotion(self, emotion):
        """
        Asynchronously sets the agent's emotion with the given emotion.

        Args:
            emotion (str): The emotion to set.
        """
        await self.send_message("EMOTION", commandArgument=emotion)

    async def send_message_with_emotion(self, message, emotion):
        """
        Asynchronously sends a message with an accompanying emotion.

        Args:
            message (str): The message content.
            emotion (str): The emotion to send.
        """
        await self.send_message("EMOTION", commandArgument=emotion, message=message)

    async def move_to(self, target):
        """
        Asynchronously sends a MOVETO command to move the agent to the given target.

        Args:
            target (str): The target location to move to.
        """
        await self.send_message("MOVETO", commandArgument=target)

    async def look_at(self, target):
        """
        Asynchronously sends a LOOKAT command to look at the given target.

        Args:
            target (str): The target location to look at.
        """
        await self.send_message("LOOKAT", commandArgument=target)