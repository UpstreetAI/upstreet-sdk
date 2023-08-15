import { chromium } from 'playwright';

/**
 * Represents an Agent in the Upstreet multiplayer world.
 */
export class Agent {
    /**
     * @property {import('playwright').Browser|null} browser - The browser instance.
     * @property {import('playwright').Page|null} page - The page instance.
     */
    browser = null;
    page = null;
    /**
    * Connects the agent to the Upstreet multiplayer world.
    * @async
    * @returns {Promise<boolean>} Returns true if already connected; otherwise, establishes a new connection.
    * @throws Will throw an error if the connection fails.
    */
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

    /**
     * Disconnects the agent from the Upstreet multiplayer world.
     * @async
     */
    async disconnect() {
        if (!this.browser) {
            console.warn('Not connected to agent. Skipping disconnection.');
        }
        await this.browser.close();
        this.page = null;
        this.browser = null;
    }

    /**
     * Checks if the agent is connected.
     * @returns {boolean} True if connected, false otherwise.
     */
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

    /**
     * Sends a message to the Upstreet multiplayer world.
     * @async
     * @param {Object} options
     * @param {string} options.command - The command to execute.
     * @param {string} [options.commandArgument] - Additional argument for the command.
     * @param {string} [options.message] - The message text.
     * @returns {Promise<void>} Resolves when the message is sent.
     */
    async sendMessage({
        command,
        commandArgument,
        message,
    }) {
        if (!this.checkConnection()) return;
        await this.page.evaluate(({ command, commandArgument, message }) => {
            if (!globalThis.writeChat) { // Uncommenting this check
                console.warn('The globalThis.writeChat function does not exist. Skipping message.');
                return;
            }
            return globalThis.writeChat({ command, commandArgument, message }); // Calling as globalThis.writeChat
        }, { command, commandArgument, message });
    }

    /**
     * Sends a speech message.
     * @async
     * @param {string} message - The speech text.
     * @returns {Promise<void>} Resolves when the speech message is sent.
     */
    async speak(message) {
        await this.sendMessage({
            command: 'SPEAK',
            message,
        })
    }

    /**
     * Sends an emote.
     * @async
     * @param {string} emote - The emote text.
     * @returns {Promise<void>} Resolves when the emote is sent.
     */
    async emote(emote) {
        await this.sendMessage({
            command: 'EMOTE',
            commandArgument: emote,
        })
    }

    /**
     * Sends a message with an emote.
     * @async
     * @param {string} emote - The emote text.
     * @param {string} message - The message text.
     * @returns {Promise<void>} Resolves when the message with emote is sent.
     */
    async sendMessageWithEmote(emote, message) {
        await this.sendMessage({
            command: 'EMOTE',
            commandArgument: emote,
            message,
        })
    }

    /**
     * Sets an emotion.
     * @async
     * @param {string} emotion - The emotion text.
     * @returns {Promise<void>} Resolves when the emotion is set.
     */
    async setEmotion(emotion) {
        await this.sendMessage({
            command: 'EMOTION',
            commandArgument: emotion,
        })
    }

    /**
     * Sends a message with an emotion.
     * @async
     * @param {string} message - The message text.
     * @param {string} emotion - The emotion text.
     * @returns {Promise<void>} Resolves when the message with emotion is sent.
     */
    async sendMessageWithEmotion(message, emotion) {
        await this.sendMessage({
            command: 'EMOTION',
            commandArgument: emotion,
            message,
        })
    }

    /**
     * Moves to a target. The target can be a player name, thing or id.
     * If the engine cannot find the player or thing by name or ID it will return the most similar match.
     * @async
     * @param {string} target - The target name or ID.
     * @returns {Promise<void>} Resolves when the agent moves to the target.
     * @example
     * await agent.moveTo('player1');
     * await agent.moveTo('thing1');
     * await agent.moveTo('123456');
     */
    async moveTo(target){
        await this.sendMessage({
            command: 'MOVETO',
            commandArgument: target,
        })
    }
}
