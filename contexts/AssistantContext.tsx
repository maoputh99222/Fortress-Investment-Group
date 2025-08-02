
import * as React from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AssistantContextType {
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AssistantContext = React.createContext<AssistantContextType | undefined>(undefined);

// A simple in-memory history store for the demo.
// In a real app, you might persist this.
let chatHistory: Message[] = [];

export const AssistantProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = React.useState<Message[]>(chatHistory);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const chatRef = React.useRef<Chat | null>(null);

  React.useEffect(() => {
    // This feature is disabled because it requires an API key provided via
    // environment variables (`process.env`), which is not secure or feasible 
    // in a client-side application. This was causing the app to crash on load.
    setError("AI Assistant is currently unavailable.");
  }, []);

  const sendMessage = async (message: string) => {
    if (error) return;
    setError("Cannot send message: AI Assistant is unavailable.");
  };

  const value = { messages, sendMessage, isLoading, error };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = React.useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};
