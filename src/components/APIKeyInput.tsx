import React, { useContext, useEffect } from "react";
import { toast } from "sonner";
import { ApiKeyContext } from "@/App";

const APIKeyInput: React.FC = () => {
  const { setApiKey } = useContext(ApiKeyContext);

  useEffect(() => {
    // Use the API key from environment variables
    const apiKey = process.env.REACT_APP_API_KEY;
    if (apiKey) {
      setApiKey(apiKey);
      toast.success("API key set for this session");
    } else {
      toast.error("API key is not set");
    }
  }, [setApiKey]);

  return (
    <div className="card-glass">
      <h3 className="text-lg font-semibold mb-4">Google Gemini API Key</h3>
      <p className="text-sm text-muted-foreground mb-6">
        The API key is set automatically for this session.
      </p>
    </div>
  );
};

/*
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { ApiKeyContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const APIKeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useContext(ApiKeyContext);
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    // Simple validation - Google API keys are typically ~40 chars
    if (inputKey.length < 20) {
      toast.warning("This doesn't look like a valid Google Gemini API key");
      return;
    }
    
    setApiKey(inputKey);
    toast.success("API key saved for this session");
  };

  return (
    <div className="card-glass">
      <h3 className="text-lg font-semibold mb-4">Google Gemini API Key</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Enter your Google Gemini API key to use the calculators. Your key is only stored in your browser's session and is never saved permanently.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showKey ? "text" : "password"}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="pr-10"
              placeholder="Enter your Google Gemini API key"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <Button type="submit" className="w-full">
          Save API Key
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Don't have an API key? <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Get one from Google Gemini</a>
        </p>
      </form>
    </div>
  );
  
};*/

export default APIKeyInput;
