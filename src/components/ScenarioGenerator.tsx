
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
    try {
      // Create a prompt for Claude that includes information about what we want
      const prompt = `Create a historical strategic decision scenario in the format of our strategy game. The scenario should be about ${topic || 'a significant historical military or political decision point'}. Provide a detailed context, situation, and 3 possible decisions with their outcomes. Include a historical outcome section that explains what actually happened.

Format it as JSON with these properties:
{
  "id": "unique-id",
  "title": "Scenario title",
  "year": "Year or time period",
  "leader": "Historical figure name",
  "context": "Detailed historical context (300 words)",
  "situation": "The specific decision point faced (200 words)",
  "decisions": [
    {
      "id": "decision-1",
      "text": "Short decision text",
      "description": "Longer explanation of this option",
      "outcomes": {
        "description": "What happens if this choice is made (200 words)",
        "resources": { "military": 10, "economy": -5, "morale": 0, "political": 15 },
        "nextScenarioId": "result-id",
        "principle": "strategic-principle"
      }
    },
    ...2 more decisions...
  ],
  "historicalOutcome": "What actually happened historically",
  "learningSummary": "A 200-word summary of the key strategic lessons from this scenario, highlighting timeless principles that can be applied to modern leadership and decision-making."
}

ONLY return the JSON object with no additional text before or after.`;

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

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.content[0].text;
      
      // Parse the JSON response
      // Find the JSON object in the response (in case Claude adds extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const scenario = JSON.parse(jsonMatch[0]);
        onNewScenario(scenario);
        toast.success('New scenario generated!');
      } else {
        throw new Error('Could not parse scenario from response');
      }
    } catch (error) {
      console.error('Error generating scenario:', error);
      toast.error('Failed to generate scenario. Check your API key and try again.');
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
