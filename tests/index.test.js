import { test, expect } from '@playwright/test';
import { Agent } from '../src/index.js'; // Update the path to the Agent class
import jest from 'jest-mock';

test.describe('Agent class', () => {
    let agent;

    test.beforeEach(async () => {
        agent = new Agent();
        await agent.connect();
    });

    test.afterEach(async () => {
        await agent.disconnect();
    });

    test('should connect and disconnect without errors', async () => {
        expect(agent.browser).toBeTruthy();
        expect(agent.page).toBeTruthy();
    });

    test('should send a test message', async () => {
        // Mock the writeChat function if needed
        await agent.page.exposeFunction('writeChat', () => {});
        await agent.sendMessage({
            command: 'TEST',
            message: 'test message',
        });
    });

    test('should speak a message', async () => {
        const mockWriteChat = jest.fn();
        await agent.page.exposeFunction('writeChat', mockWriteChat);
        await agent.speak('test speak');
        expect(mockWriteChat).toHaveBeenCalledWith({ command: 'SPEAK', message: 'test speak' });
    });

    test('should send an emote', async () => {
        const mockWriteChat = jest.fn();
        await agent.page.exposeFunction('writeChat', mockWriteChat);
        await agent.emote('test emote');
        expect(mockWriteChat).toHaveBeenCalledWith({ command: 'EMOTE', commandArgument: 'test emote' });
    });

    test('should send message with emotion', async () => {
        const mockWriteChat = jest.fn();
        await agent.page.exposeFunction('writeChat', mockWriteChat);
        await agent.sendMessageWithEmotion('test message', 'happy');
        expect(mockWriteChat).toHaveBeenCalledWith({ command: 'EMOTION', commandArgument: 'happy', message: 'test message' });
    });

    test('should move to a target', async () => {
        const mockWriteChat = jest.fn();
        await agent.page.exposeFunction('writeChat', mockWriteChat);
        await agent.moveTo('Cafe');
        expect(mockWriteChat).toHaveBeenCalledWith({ command: 'MOVETO', commandArgument: 'Cafe' });
    });    
});
