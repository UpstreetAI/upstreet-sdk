import asyncio
import time
import pytest
from upstreet.main import Agent


@pytest.mark.asyncio
async def test_agent_commands():
    agent = Agent()
    await agent.connect()
    
    # wait for agent.ready to be true
    while agent.ready is False:
        print("Waiting for agent to be ready...")
        await asyncio.sleep(3)


    await agent.speak("Hello, world!")
    # Wait for a specific condition related to speaking, if applicable
    await asyncio.sleep(1)

    await agent.emote("smile")
    # Wait for a specific condition related to smiling, if applicable
    print("Agent is smiling.")
    time.sleep(1)
    await agent.send_message_with_emote("smile", "Hello!")
    time.sleep(1)
    print("Agent is happy.")
    await agent.set_emotion("happy")
    time.sleep(1)
    print("Agent is sad.")
    await agent.send_message_with_emotion("Hello, world!", "happy")
    time.sleep(1)
    print("Agent is angry.")
    await agent.move_to("tree")
    time.sleep(1)
    print("Agent is at the tree.")
    assert await agent.check_connection() is True
    print("Agent commands test complete.")
    await agent.disconnect()
    print("Agent disconnected.")
    time.sleep(1)