import asyncio
import pytest
from upstreet.main import Agent


@pytest.fixture(scope="module")
def agent():
    async def setup_agent():
        agent_instance = Agent()
        await agent_instance.connect()

        # Wait until agent is ready
        while not agent_instance.ready:
            print("Waiting for agent to be ready...")
            await asyncio.sleep(3)  # 1-second wait
        await asyncio.sleep(2)

        return agent_instance

    async def teardown_agent(agent_instance):
        await agent_instance.disconnect()

    agent_instance = asyncio.run(setup_agent())
    yield agent_instance
    asyncio.run(teardown_agent(agent_instance))


@pytest.mark.asyncio
async def test_agent_connection(agent):
    assert await agent.check_connection() is True


@pytest.mark.asyncio
async def test_agent_commands(agent):
    print("Testing agent commands...")
    await asyncio.sleep(1)
    await agent.speak("Hello, world!")
    await asyncio.sleep(1)
    await agent.emote("smile")
    await asyncio.sleep(1)
    await agent.send_message_with_emote("smile", "Hello!")
    await asyncio.sleep(1)
    await agent.set_emotion("happy")
    await asyncio.sleep(1)
    await agent.send_message_with_emotion("Hello, world!", "happy")
    await asyncio.sleep(1)
    await agent.move_to("target_location")
    await asyncio.sleep(1)
    assert await agent.check_connection() is True
    print("Agent commands test complete.")
