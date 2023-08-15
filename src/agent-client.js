import { chromium } from 'playwright';

export class Agent {
    connected = false;
    async connect() {
        if(connected) {
            console.warn('Already connected to agent. Skipping connection.');
            return true;
        }
        try {
            const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.goto('https://upstreet.ai/g');
            connected = true;
        } catch (error) {
            console.error('An error occurred while connecting:', error);
        }
        return connected;
    }
    async disconnect(){
        if(!connected) {
            console.warn('Not connected to agent. Skipping disconnection.');
        }
        connected = false;
        await browser.close();
    }

}
