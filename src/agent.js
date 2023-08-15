import { chromium } from 'playwright';

export class Agent {
    browser = null;
    page = null;
    async connect() {
        if (this.browser) {
            console.warn('Already connected to agent. Skipping connection.');
            return true;
        }
        try {
            this.browser = await chromium.launch();
            this.page = await this.browser.newPage();
            await this.page.goto('https://upstreet.ai/g');
        } catch (error) {
            console.error('An error occurred while connecting:', error);
        }

        function readChat({
            playerName,
            playerId,
            command,
            commandArgument,
            message,
        }) {
            this.emit('message', {
                playerName,
                playerId,
                command,
                commandArgument,
                message,
            });
        }

        await this.page.exposeFunction('readChat', readChat.bind(this));
    }


    async disconnect() {
        if (!this.browser) {
            console.warn('Not connected to agent. Skipping disconnection.');
        }
        await this.browser.close();
    }

    checkConnection() {
        if (!this.browser) {
            console.warn('Not connected to agent. Skipping message.');
            return false;
        }
        if (!this.page) {
            console.warn("The page was closed in the browser. Skipping message.");
            return false;
        }
        return true;
    }

    async sendMessage({
        command,
        commandArgument,
        message,
    }) {
        if (!this.checkConnection()) return;
        await this.page.evaluate((command, commandArgument, message) => {
            return globalThis.writeChat({ command, commandArgument, message });
        }, command, commandArgument, message);
    }

    async speak(message) {
        sendMessage({
            command: 'SPEAK',
            message,
        })
    }

    async emote(emote) {
        sendMessage({
            command: 'EMOTE',
            commandArgument: emote,
        })
    }

    async sendMessageWithEmote(emote, message) {
        sendMessage({
            command: 'EMOTE',
            commandArgument: emote,
            message,
        })
    }

    async setEmotion(emotion) {
        sendMessage({
            command: 'EMOTION',
            commandArgument: emotion,
        })
    }

    async sendMessageWithEmotion(message, emotion) {
        sendMessage({
            command: 'EMOTION',
            commandArgument: emotion,
            message,
        })
    }
}
