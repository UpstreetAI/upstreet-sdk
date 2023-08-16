import { test, expect } from '@playwright/test';
import { Agent } from '../src/index.js'; // Update the path to the Agent class

async function waitForEngineReady(agent) {
    // Wait until the engine is ready by periodically checking the ready flag
    while (!agent.ready) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

test.describe('Agent class', () => {
    let agent;

    test.beforeAll(async () => {
        agent = new Agent();
        await agent.connect();
        await waitForEngineReady(agent);
    });

    test.afterAll(async () => {
        await agent.disconnect();
    });

    test('should connect and disconnect without errors', async () => {
        expect(agent.browser).toBeTruthy();
        expect(agent.page).toBeTruthy();
    });

    test('should send a test message', async () => {
        // Here you can validate that the message was successfully sent to the Upstreet multiplayer world
        await agent.sendMessage({
            command: 'TEST',
            message: 'test message',
        });
    });

    test('should speak a message', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await agent.speak('test speak');
        // wait one second
    });

    test('should send an emote', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await agent.emote('test emote');
    });

    test('should send message with emotion', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await agent.sendMessageWithEmotion('test message', 'happy');
    });

    test('should move to a target', async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await agent.moveTo('Cafe');
    });
});
