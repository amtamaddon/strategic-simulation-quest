
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand } from 'lucide-react';
import { toast } from 'sonner';
import { useGame } from './GameContext';

interface ScenarioGeneratorProps {
  onNewScenario: (scenario: any) => void;
}

const ScenarioGenerator: React.FC<ScenarioGeneratorProps> = ({ onNewScenario }) => {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('anthropicApiKey') || '');
  const [showApiInput, setShowApiInput] = useState<boolean>(!localStorage.getItem('anthropicApiKey'));
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>('');
  const { gameState } = useGame();

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('anthropicApiKey', apiKey.trim());
      setShowApiInput(false);
      toast.success('API key saved');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('anthropicApiKey');
    setApiKey('');
    setShowApiInput(true);
    toast.success('API key removed');
  };

  const generateScenario = async () => {
    const storedApiKey = localStorage.getItem('anthropicApiKey');
    if (!storedApiKey) {
      setShowApiInput(true);
      toast.error('API key required');
      return;
    }

    setIsGenerating(true);
    toast.info('Generating scenario...');
    
    try {
      const uniqueId = `custom-${Date.now()}`;
      const prompt = `Create a historical strategic decision scenario. The scenario should be about ${topic || 'a significant historical military or political decision point'}. Include context, situation, and 3 possible decisions with their outcomes.

Return ONLY valid JSON like this (add additional text or explanations inside the JSON, not outside it):
{
  "id": "${uniqueId}",
  "title": "Scenario Title",
  "year": "Year or Period",
  "leader": "Historical Leader",
  "context": "Historical context and background (2-3 paragraphs)",
  "situation": "The decision point faced (1-2 paragraphs)",
  "decisions": [
    {
      "id": "decision-1",
      "text": "First option (short)",
      "description": "Details about this option",
      "outcomes": {
        "description": "Result of this choice",
        "resources": {"military":0, "economy":0, "morale":0, "political":0},
        "nextScenarioId": "finale"
      }
    },
    {
      "id": "decision-2", 
      "text": "Second option (short)",
      "description": "Details about this option",
      "outcomes": {
        "description": "Result of this choice",
        "resources": {"military":0, "economy":0, "morale":0, "political":0},
        "nextScenarioId": "finale"
      }
    },
    {
      "id": "decision-3",
      "text": "Third option (short)",
      "description": "Details about this option",
      "outcomes": {
        "description": "Result of this choice",
        "resources": {"military":0, "economy":0, "morale":0, "political":0},
        "nextScenarioId": "finale"
      }
    }
  ],
  "historicalOutcome": "What actually happened in history",
  "learningSummary": "Strategic lessons from this scenario that apply to modern leadership"
}`;

      console.log("Sending request to Anthropic API");
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': storedApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 4000,
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${responseText}`);
      }

      // Parse the response text to JSON
      const data = JSON.parse(responseText);
      console.log("Parsed response data:", data);
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response format from API');
      }
      
      const content = data.content[0].text;
      console.log("Content from API:", content);
      
      // Find JSON in the response (look for object between curly braces)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not find valid JSON in the response');
      }
      
      const jsonStr = jsonMatch[0];
      console.log("Extracted JSON string:", jsonStr);
      
      // Parse the JSON
      try {
        const scenarioData = JSON.parse(jsonStr);
        console.log("Parsed scenario:", scenarioData);
        
        // Basic validation
        if (!scenarioData.id || !scenarioData.title || !Array.isArray(scenarioData.decisions)) {
          throw new Error('Generated scenario is missing required fields');
        }
        
        // Make sure each decision has the required structure
        scenarioData.decisions.forEach((decision: any, index: number) => {
          if (!decision.id) decision.id = `decision-${index + 1}`;
          if (!decision.outcomes) decision.outcomes = {};
          if (!decision.outcomes.nextScenarioId) decision.outcomes.nextScenarioId = "finale";
          if (!decision.outcomes.resources) {
            decision.outcomes.resources = { military: 0, economy: 0, morale: 0, political: 0 };
          }
        });
        
        // Add learning summary if missing
        if (!scenarioData.learningSummary) {
          scenarioData.learningSummary = "Historical decisions provide valuable lessons for modern leadership, including the importance of understanding context, evaluating multiple options, and considering long-term consequences.";
        }
        
        onNewScenario(scenarioData);
        toast.success('New scenario generated successfully!');
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        throw new Error('Could not parse scenario JSON. Invalid format received.');
      }
    } catch (error) {
      console.error('Error generating scenario:', error);
      toast.error(`Error: ${error.message || 'Failed to generate scenario'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="parchment-card mb-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Generate New Scenario</h3>
      
      {showApiInput ? (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Anthropic API Key</label>
          <div className="flex space-x-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api..."
              className="flex-1"
            />
            <Button onClick={saveApiKey}>Save Key</Button>
          </div>
          <p className="text-xs text-ink-light mt-1">
            Your API key is stored only in your browser's localStorage and never sent to our servers.
          </p>
        </div>
      ) : (
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={clearApiKey}>
            Change API Key
          </Button>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Topic (optional)</label>
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Napoleon's Russian Campaign, Cuban Missile Crisis"
          className="w-full"
        />
      </div>
      
      <Button 
        onClick={generateScenario} 
        disabled={isGenerating}
        className="w-full"
      >
        <Wand className="h-4 w-4 mr-2" />
        {isGenerating ? 'Generating...' : 'Generate New Scenario'}
      </Button>
    </div>
  );
};

export default ScenarioGenerator;
