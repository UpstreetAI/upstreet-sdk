import subprocess


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
    from playwright.sync_api import sync_playwright
except ImportError:
    install_playwright()
    from playwright.sync_api import sync_playwright


class Agent:
    """
    Represents an autonomous agent that interacts with a web page through Playwright.
    """

    def __init__(self):
        """Initializes the Agent with default values."""
        self.browser = None
        self.page = None

    def connect(self):
        """
        Connects to the agent through a Chromium browser.

        Returns:
            bool: True if the connection is successful, False otherwise.
        """
        if self.browser:
            print("Already connected to agent. Skipping connection.")
            return True
        try:
            with sync_playwright() as p:
                self.browser = p.chromium.launch()
                self.page = self.browser.new_page()
                self.page.goto("https://upstreet.ai/g")
        except Exception as error:
            print("An error occurred while connecting:", error)
            return False

        def read_chat(playerName, playerId, command, commandArgument, message):
            """Callback function to read chat messages."""
            # Assuming an emit method on self
            self.emit(
                "message",
                {
                    "playerName": playerName,
                    "playerId": playerId,
                    "command": command,
                    "commandArgument": commandArgument,
                    "message": message,
                },
            )

        self.page.expose_function("readChat", read_chat)
        return True

    def disconnect(self):
        """
        Disconnects from the agent and closes the browser.
        """
        if not self.browser:
            print("Not connected to agent. Skipping disconnection.")
        else:
            self.browser.close()
        self.page = None
        self.browser = None

    def check_connection(self):
        """
        Checks if the agent is connected.

        Returns:
            bool: True if connected, False otherwise.
        """
        if not self.browser:
            print("Not connected to agent. Skipping message.")
            return False
        if not self.page:
            print("The page was closed in the browser. Skipping message.")
            return False
        return True

    def send_message(self, command, commandArgument=None, message=None):
        """
        Sends a message to the agent.

        Args:
            command (str): The command to send.
            commandArgument (str, optional): Additional argument for the command. Defaults to None.
            message (str, optional): The message content. Defaults to None.
        """
        if not self.check_connection():
            return
        self.page.evaluate(
            """({ command, commandArgument, message }) => {
            if (!globalThis.writeChat) {
                console.warn('The globalThis.writeChat function does not exist. Skipping message.');
                return;
            }
            return globalThis.writeChat({ command, commandArgument, message });
        }""",
            {
                "command": command,
                "commandArgument": commandArgument,
                "message": message,
            },
        )

    def speak(self, message):
        """
        Sends a SPEAK command with the given message.

        Args:
            message (str): The message to speak.
        """
        self.send_message("SPEAK", message=message)

    def emote(self, emote):
        """
        Sends an EMOTE command with the given emote.

        Args:
            emote (str): The emote to send.
        """
        self.send_message("EMOTE", commandArgument=emote)

    def send_message_with_emote(self, emote, message):
        """
        Sends a message with an accompanying emote.

        Args:
            emote (str): The emote to send.
            message (str): The message content.
        """
        self.send_message("EMOTE", commandArgument=emote, message=message)

    def set_emotion(self, emotion):
        """
        Sets the agent's emotion with the given emotion.

        Args:
            emotion (str): The emotion to set.
        """
        self.send_message("EMOTION", commandArgument=emotion)

    def send_message_with_emotion(self, message, emotion):
        """
        Sends a message with an accompanying emotion.

        Args:
            message (str): The message content.
            emotion (str): The emotion to send.
        """
        self.send_message("EMOTION", commandArgument=emotion, message=message)

    def move_to(self, target):
        """
        Sends a MOVETO command to move the agent to the given target.

        Args:
            target (str): The target location to move to.
        """
        self.send_message("MOVETO", commandArgument=target)
