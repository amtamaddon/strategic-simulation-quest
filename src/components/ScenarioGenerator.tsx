
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useGame } from './GameContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ScenarioGeneratorProps {
  onNewScenario: (scenario: any) => void;
}

const ScenarioGenerator: React.FC<ScenarioGeneratorProps> = ({ onNewScenario }) => {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('anthropicApiKey') || '');
  const [showApiInput, setShowApiInput] = useState<boolean>(!localStorage.getItem('anthropicApiKey'));
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { gameState } = useGame();

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('anthropicApiKey', apiKey.trim());
      setShowApiInput(false);
      setError(null);
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
    setError(null);
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
      
      // Attempt to use fetch with timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      try {
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
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error:", response.status, errorText);
          throw new Error(`API error: ${response.status} - ${errorText || 'Unknown error'}`);
        }
        
        const responseText = await response.text();
        console.log("Raw response:", responseText);
        
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
          setError(null);
          toast.success('New scenario generated successfully!');
        } catch (parseError) {
          console.error('JSON parsing error:', parseError);
          throw new Error('Could not parse scenario JSON. Invalid format received.');
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. The API may be experiencing issues.');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Error generating scenario:', error);
      const errorMessage = error.message || 'Failed to generate scenario';
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate a sample scenario without using the API
  const generateSampleScenario = () => {
    setIsGenerating(true);
    setError(null);
    toast.info('Creating sample scenario...');
    
    setTimeout(() => {
      try {
        const uniqueId = `sample-${Date.now()}`;
        const sampleScenario = {
          "id": uniqueId,
          "title": "The Cuban Missile Crisis",
          "year": "1962",
          "leader": "President John F. Kennedy",
          "context": "In October 1962, U.S. reconnaissance flights discovered Soviet missile sites under construction in Cuba. The missiles would be capable of striking most of the continental United States with nuclear warheads, giving the Soviet Union a significant strategic advantage in the Cold War.\n\nThe crisis emerged against the backdrop of deteriorating U.S.-Soviet relations, the failed Bay of Pigs invasion of Cuba, and the placement of U.S. Jupiter missiles in Turkey. Soviet Premier Nikita Khrushchev saw Cuba as an opportunity to protect a communist ally and redress the strategic imbalance created by U.S. missiles positioned near Soviet borders.",
          "situation": "President Kennedy and his advisors in the Executive Committee of the National Security Council (ExComm) faced a critical decision. Soviet nuclear missiles in Cuba presented an immediate threat to U.S. national security, but any action risked escalation to nuclear war between the superpowers.\n\nThe world stood at the brink of nuclear conflict, and Kennedy needed to respond decisively while avoiding actions that would trigger a catastrophic war.",
          "decisions": [
            {
              "id": "decision-1",
              "text": "Naval Blockade",
              "description": "Establish a naval quarantine around Cuba to prevent further Soviet shipments of offensive weapons while pursuing diplomatic negotiations.",
              "outcomes": {
                "description": "The blockade successfully halts Soviet ships carrying additional missiles. It gives both sides time to negotiate while demonstrating U.S. resolve. After tense negotiations, Khrushchev agrees to remove the missiles in exchange for a U.S. pledge not to invade Cuba and a secret promise to remove Jupiter missiles from Turkey. The crisis is resolved without direct military conflict.",
                "resources": {"military":-10, "economy":-10, "morale":30, "political":40},
                "nextScenarioId": "finale"
              }
            },
            {
              "id": "decision-2",
              "text": "Surgical Air Strike",
              "description": "Launch precision air strikes to destroy the missile sites before they become operational.",
              "outcomes": {
                "description": "The air strikes successfully destroy most missile sites but miss several hidden installations. Soviet forces in Cuba respond by killing American pilots, and the USSR threatens retaliation against Berlin. The situation rapidly escalates as Khrushchev mobilizes Soviet forces. The crisis deepens, bringing the world even closer to nuclear war.",
                "resources": {"military":-20, "economy":-30, "morale":-10, "political":-30},
                "nextScenarioId": "finale"
              }
            },
            {
              "id": "decision-3",
              "text": "Full-Scale Invasion",
              "description": "Launch a comprehensive military invasion of Cuba to remove the Castro regime and all Soviet military presence.",
              "outcomes": {
                "description": "The invasion initially achieves tactical success but leads to significant American casualties as Soviet forces defend the island with conventional weapons. As U.S. forces advance, Soviet officers in Cuba launch tactical nuclear weapons, killing thousands of American troops. The situation spirals toward full nuclear exchange before urgent negotiations halt further escalation.",
                "resources": {"military":-50, "economy":-40, "morale":-30, "political":-40},
                "nextScenarioId": "finale"
              }
            }
          ],
          "historicalOutcome": "President Kennedy chose the naval blockade (officially called a 'quarantine' for legal reasons). After thirteen tense days and secret negotiations, Khrushchev agreed to remove the missiles in exchange for a U.S. pledge not to invade Cuba and a secret agreement to remove U.S. Jupiter missiles from Turkey.",
          "learningSummary": "The Cuban Missile Crisis demonstrates the value of measured response in crisis situations. Kennedy rejected both the passive approach of diplomatic protests and the aggressive option of immediate military action. Instead, he chose a middle path that demonstrated resolve while giving diplomacy time to work. The crisis shows how offering your opponent a face-saving way to retreat can be essential to resolving conflicts peacefully."
        };
        
        onNewScenario(sampleScenario);
        setError(null);
        toast.success('Sample scenario created successfully!');
      } catch (error) {
        console.error('Error creating sample scenario:', error);
        setError('Failed to create sample scenario');
        toast.error('Failed to create sample scenario');
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };

  return (
    <div className="parchment-card mb-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Generate New Scenario</h3>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={generateSampleScenario}
                className="mr-2"
              >
                Use Sample Scenario Instead
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
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
          <p className="text-xs text-ink-light mt-1">
            Don't have an API key? You can still try a <Button variant="link" className="p-0 h-auto text-xs" onClick={generateSampleScenario}>sample scenario</Button>.
          </p>
        </div>
      ) : (
        <div className="flex justify-between mb-4">
          <Button variant="link" size="sm" onClick={generateSampleScenario}>
            Use Sample Scenario
          </Button>
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
