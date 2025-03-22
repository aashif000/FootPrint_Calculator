
import React, { useState, useContext } from "react";
import { ApiKeyContext } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SendIcon, Bot, Loader2 } from "lucide-react";

// Define the message type for clarity
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const FootprintChatbot: React.FC = () => {
  const { apiKey } = useContext(ApiKeyContext);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your carbon and water footprint assistant. You can ask me questions about calculating environmental footprints for agricultural products, transportation, or lifestyle choices. How can I help you today?' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    if (!apiKey) {
      toast.error("Please provide your Google Gemini API key first");
      return;
    }

    // Add user message to chat
    const newMessages = [
      ...messages,
      { role: 'user' as const, content: userInput }
    ];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      // Create system prompt for footprint calculations
      const systemPrompt = {
        role: "system",
        parts: [{
          text: `You are an expert environmental science assistant specialized in carbon and water footprint calculations. 
          
          Focus areas:
          1. Agricultural product footprints (crops, livestock, processed foods)
          2. Transportation footprints (vehicles, flights, public transport)
          3. Household and lifestyle footprints (energy, water, waste)
          4. Carbon offsetting and reduction strategies
          
          When asked about footprint calculations:
          - Provide precise numerical estimates based on scientific data
          - Explain the calculation methodology clearly
          - Include the key factors that influence the footprint
          - Offer practical suggestions for reducing the footprint
          
          Be concise but thorough in your explanations. Use metric units (kg CO2e, liters, etc.) and provide context for the numbers (e.g., comparisons to average values).`
        }]
      };

      // Prepare conversation history for the API
      const conversationHistory = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [systemPrompt, ...conversationHistory],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request.";

      // Add assistant response to chat
      setMessages([...newMessages, { role: 'assistant' as const, content: assistantResponse }]);
    } catch (error) {
      console.error("Error in Gemini API request:", error);
      toast.error("Failed to get a response. Please try again.");
      // Add error message to chat
      setMessages([...newMessages, { role: 'assistant' as const, content: "I'm sorry, I encountered an error processing your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Bot className="mr-2 h-6 w-6 text-green-600" />
          Footprint Chatbot
        </CardTitle>
        <CardDescription>
          Ask questions about carbon and water footprints for agricultural products, transportation, or personal lifestyle choices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted rounded-md p-4 h-[400px] overflow-y-auto flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground rounded-lg p-3 flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about carbon or water footprints..."
            className="flex-1 resize-none"
          />
          <Button 
            onClick={sendMessage} 
            className="ml-2 self-end bg-green-600 hover:bg-green-700"
            disabled={isLoading || !userInput.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>Example questions:</p>
          <ul className="list-disc list-inside">
            <li>"What's the carbon footprint of 1kg of beef?"</li>
            <li>"How much water is used to produce a cotton t-shirt?"</li>
            <li>"How can I reduce the carbon footprint of my daily commute?"</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FootprintChatbot;
