import subprocess


def install_playwright():
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
    def __init__(self):
        self.browser = None
        self.page = None

    def connect(self):
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
        if not self.browser:
            print("Not connected to agent. Skipping disconnection.")
        else:
            self.browser.close()
        self.page = None
        self.browser = None

    def check_connection(self):
        if not self.browser:
            print("Not connected to agent. Skipping message.")
            return False
        if not self.page:
            print("The page was closed in the browser. Skipping message.")
            return False
        return True

    def send_message(self, command, commandArgument=None, message=None):
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
        self.send_message("SPEAK", message=message)

    def emote(self, emote):
        self.send_message("EMOTE", commandArgument=emote)

    def send_message_with_emote(self, emote, message):
        self.send_message("EMOTE", commandArgument=emote, message=message)

    def set_emotion(self, emotion):
        self.send_message("EMOTION", commandArgument=emotion)

    def send_message_with_emotion(self, message, emotion):
        self.send_message("EMOTION", commandArgument=emotion, message=message)
