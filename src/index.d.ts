// Agent.d.ts
declare module 'Agent' {
    import { Browser, Page } from 'playwright';
  
    export class Agent {
      browser: Browser | null;
      page: Page | null;
      connect(): Promise<boolean>;
      disconnect(): Promise<void>;
      checkConnection(): boolean;
      sendMessage(options: { command: string; commandArgument?: string; message?: string }): Promise<void>;
      speak(message: string): Promise<void>;
      emote(emote: string): Promise<void>;
      sendMessageWithEmote(emote: string, message: string): Promise<void>;
      setEmotion(emotion: string): Promise<void>;
      sendMessageWithEmotion(message: string, emotion: string): Promise<void>;
    }
  }
  