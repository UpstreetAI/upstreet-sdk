import unittest
from unittest.mock import MagicMock, patch
from upstreet.main import Agent

class TestAgent(unittest.TestCase):
    def setUp(self):
        self.agent = Agent()
        self.agent.browser = MagicMock()
        self.agent.page = MagicMock()

    def test_connect_already_connected(self):
        self.agent.browser = True
        self.assertTrue(self.agent.connect())

    @patch("upstreet.main.sync_playwright")
    def test_connect_new_connection(self, mock_sync_playwright):
        self.agent.browser = None
        mock_sync_playwright.return_value.__enter__.return_value.chromium.launch.return_value.new_page.return_value.goto.return_value = True
        self.assertTrue(self.agent.connect())

    def test_disconnect_not_connected(self):
        self.agent.browser = None
        self.assertIsNone(self.agent.disconnect())

    def test_check_connection_not_connected(self):
        self.agent.browser = None
        self.assertFalse(self.agent.check_connection())

    def test_check_connection_page_closed(self):
        self.agent.page = None
        self.assertFalse(self.agent.check_connection())

    def test_check_connection_connected(self):
        self.assertTrue(self.agent.check_connection())

    def test_send_message_not_connected(self):
        self.agent.browser = None
        self.assertIsNone(self.agent.send_message("TEST"))

    def test_send_message_connected(self):
        self.agent.page.evaluate = MagicMock()
        self.agent.send_message("TEST", commandArgument="arg", message="message")
        self.agent.page.evaluate.assert_called_once()

    def test_speak(self):
        self.agent.send_message = MagicMock()
        self.agent.speak("Hello")
        self.agent.send_message.assert_called_once_with("SPEAK", message="Hello")

    def test_emote(self):
        self.agent.send_message = MagicMock()
        self.agent.emote("smile")
        self.agent.send_message.assert_called_once_with("EMOTE", commandArgument="smile")

    def test_send_message_with_emote(self):
        self.agent.send_message = MagicMock()
        self.agent.send_message_with_emote("smile", "Hello")
        self.agent.send_message.assert_called_once_with("EMOTE", commandArgument="smile", message="Hello")

    def test_set_emotion(self):
        self.agent.send_message = MagicMock()
        self.agent.set_emotion("happy")
        self.agent.send_message.assert_called_once_with("EMOTION", commandArgument="happy")

    def test_send_message_with_emotion(self):
        self.agent.send_message = MagicMock()
        self.agent.send_message_with_emotion("Hello", "happy")
        self.agent.send_message.assert_called_once_with("EMOTION", commandArgument="happy", message="Hello")

    def test_move_to(self):
        self.agent.send_message = MagicMock()
        self.agent.move_to(target="Cafe")
        self.agent.send_message.assert_called_once_with("MOVETO", commandArgument="Cafe")

if __name__ == "__main__":
    unittest.main()
