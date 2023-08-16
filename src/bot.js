#!/usr/bin/env node

import { Agent } from './index.js';
import { setIntervalAsync } from 'set-interval-async/dynamic'; // You might need to install this package

class RandomAgentBot {
    constructor() {
        this.agent = new Agent();
        this.emotions = ['joy', 'sorrow', 'angry', 'fun', 'surprise'];
        this.emotes = ['alert', 'angry', 'embarassed', 'headNod', 'headShake', 'sad', 'surprise', 'victory'];
        this.messages = ['Hello world!', 'Exploring Upstreet!', 'Feeling random today!'];
        this.targets = ['Cafe', 'Park', 'Library']; // You can add more target locations here
    }

    async start() {
        await this.agent.connect();
        setIntervalAsync(this.randomAction.bind(this), 5000); // Executes a random action every 5 seconds
    }

    async randomAction() {
        if(!this.agent.ready) return;
        const actionType = Math.floor(Math.random() * 5);
        switch (actionType) {
            case 0:
                await this.randomSpeak();
                break;
            case 1:
                await this.randomEmote();
                break;
            case 2:
                await this.randomMove();
                break;
            case 3:
                await this.randomEmotion();
                break;
            case 4:
                await this.randomMessageWithEmote();
                break;
        }
    }

    async randomSpeak() {
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        console.log(`Speaking: ${message}`);
        await this.agent.speak(message);
    }

    async randomEmote() {
        const emote = this.emotes[Math.floor(Math.random() * this.emotes.length)];
        console.log(`Emoting: ${emote}`);
        await this.agent.emote(emote);
    }

    async randomMove() {
        const target = this.targets[Math.floor(Math.random() * this.targets.length)];
        console.log(`Moving to: ${target}`);
        await this.agent.moveTo(target);
    }

    async randomEmotion() {
        const emotion = this.emotions[Math.floor(Math.random() * this.emotions.length)];
        console.log(`Setting emotion: ${emotion}`);
        await this.agent.setEmotion(emotion);
    }

    async randomMessageWithEmote() {
        const emote = this.emotes[Math.floor(Math.random() * this.emotes.length)];
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        console.log(`Sending message with emote: ${emote}, ${message}`);
        await this.agent.sendMessageWithEmote(emote, message);
    }
}

// Start the bot
const bot = new RandomAgentBot();
bot.start();
