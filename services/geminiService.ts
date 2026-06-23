import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Singleton-ish service to manage the chat session
class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;
  private modelId: string = "gemini-2.5-flash";

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-dev' });
  }

  public initChat() {
    this.chatSession = this.ai.chats.create({
      model: this.modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }

  public async sendMessageStream(message: string): Promise<AsyncIterable<string>> {
    if (!this.chatSession) {
      this.initChat();
    }

    try {
      const result = await this.chatSession!.sendMessageStream({ message });
      
      // Return an async iterable that yields text chunks
      return {
        async *[Symbol.asyncIterator]() {
          for await (const chunk of result) {
            if (chunk.text) {
              yield chunk.text;
            }
          }
        }
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  public resetChat() {
    this.initChat();
  }
}

export const geminiService = new GeminiService();
