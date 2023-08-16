import pytest
from upstreet.main import Agent

@pytest.mark.asyncio
async def test_agent_connection():
    agent = Agent()
    assert await agent.connect() is True
    assert await agent.check_connection() is True
    print("Agent connected")
    await agent.disconnect()
    assert await agent.check_connection() is False

@pytest.mark.asyncio
async def test_agent_disconnect():
    agent = Agent()
    await agent.connect()
    await agent.disconnect()
    assert agent.browser is None
    assert agent.page is None

@pytest.mark.asyncio
async def test_agent_speak():
    agent = Agent()
    await agent.connect()
    # Assuming you have a way to verify the speech on the browser
    await agent.speak('Hello, world!')
    await agent.disconnect()

@pytest.mark.asyncio
async def test_agent_emote():
    agent = Agent()
    await agent.connect()
    # Assuming you have a way to verify the emote on the browser
    await agent.emote('smile')
    await agent.disconnect()

@pytest.mark.asyncio
async def test_agent_send_message_with_emote():
    agent = Agent()
    await agent.connect()
    # Assuming you have a way to verify the emote and message on the browser
    await agent.send_message_with_emote('smile', 'Hello!')
    await agent.disconnect()

@pytest.mark.asyncio
async def test_agent_set_emotion():
    agent = Agent()
    await agent.connect()
    # Assuming you have a way to verify the emotion on the browser
    await agent.set_emotion('happy')
    await agent.disconnect()

@pytest.mark.asyncio
async def test_agent_send_message_with_emotion():
    agent = Agent()
    await agent.connect()
    # Assuming you have a way to verify the emotion and message on the browser
    await agent.send_message_with_emotion('Hello, world!', 'happy')
    await agent.disconnect()

@pytest.mark.asyncio
async def test_agent_move_to():
    agent = Agent()
    await agent.connect()
    # Assuming you have a way to verify the movement on the browser
    await agent.move_to('target_location')
    await agent.disconnect()
