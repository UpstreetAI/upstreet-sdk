import asyncio
import random
from upstreet.main import Agent


class Bot:
    def __init__(self):
        self.agent = Agent()
        self.actions = [
            self.speak,
            self.emote,
            self.send_message_with_emote,
            self.set_emotion,
            self.send_message_with_emotion,
            self.move_to,
        ]

    async def speak(self):
        message = "Hello, world! Rock on!"
        await self.agent.speak(message)

    async def emote(self):
        emote = random.choice(['alert', 'angry', 'embarassed', 'headNod', 'headShake', 'sad', 'surprise', 'victory'])
        await self.agent.emote(emote)

    async def send_message_with_emote(self):
        emote = random.choice(['alert', 'angry', 'embarassed', 'headNod', 'headShake', 'sad', 'surprise', 'victory'])
        message = "Feeling " + emote + " today!"
        await self.agent.send_message_with_emote(emote, message)

    async def set_emotion(self):
        emotion = random.choice(['joy', 'sorrow', 'angry', 'fun'])
        await self.agent.set_emotion(emotion)

    async def send_message_with_emotion(self):
        emotion = random.choice(['joy', 'sorrow', 'angry', 'fun'])
        message = "I'm feeling " + emotion + " today!"
        await self.agent.send_message_with_emotion(message, emotion)

    async def move_to(self):
        target = random.choice(["tree", "Drake", "Sword"])
        await self.agent.move_to(target)

    async def random_action(self):
        action = random.choice(self.actions)
        await action()

    async def run(self):
        await self.agent.connect()
        while True:  # Execute 10 random actions
            if self.agent.ready is False:
                print('Waiting for engine to start...')
                await asyncio.sleep(5)
                continue
            print('Performing action...')
            await self.random_action()
            await asyncio.sleep(5)  # Wait for 1 second between actions
            # if the user presses ctrl c, break
            try:
                pass
            except KeyboardInterrupt:
                break
        await self.agent.disconnect()


if __name__ == "__main__":
    bot = Bot()
    asyncio.run(bot.run())
