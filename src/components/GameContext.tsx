
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, Decision, GameEvent, StrategicPrinciple, Scenario } from '../types/game';
import { initialGameState, scenarios as defaultScenarios, strategicPrinciples } from '../data/scenarios';
import { toast } from 'sonner';

interface GameContextType {
  gameState: GameState;
  currentScenario: Scenario | undefined;
  scenarios: Scenario[];
  makeDecision: (decision: Decision) => void;
  resetGame: () => void;
  discoverPrinciple: (principle: StrategicPrinciple) => void;
  addCustomScenario: (scenario: any) => void;
  startNewScenario: (scenarioId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>(defaultScenarios);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentScenario, setCurrentScenario] = useState<Scenario | undefined>(
    defaultScenarios.find(s => s.id === initialGameState.currentScenarioId)
  );

  // Load game state and custom scenarios from localStorage on initial render
  useEffect(() => {
    console.log("Loading initial game state and scenarios");
    
    // Load game state
    const savedState = localStorage.getItem('hannibalGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        console.log("Loaded saved game state:", parsedState);
        setGameState(parsedState);
      } catch (error) {
        console.error('Failed to parse saved game state:', error);
        // Reset to initial state if there's an error
        setGameState(initialGameState);
      }
    }

    // Load custom scenarios
    const savedScenarios = localStorage.getItem('customScenarios');
    if (savedScenarios) {
      try {
        const parsedScenarios = JSON.parse(savedScenarios);
        console.log("Loaded custom scenarios:", parsedScenarios);
        setScenarios([...defaultScenarios, ...parsedScenarios]);
      } catch (error) {
        console.error('Failed to parse saved scenarios:', error);
        // Reset to default scenarios if there's an error
        setScenarios(defaultScenarios);
      }
    }
  }, []);

  // Update current scenario whenever currentScenarioId or scenarios change
  useEffect(() => {
    console.log("Updating current scenario. ID:", gameState.currentScenarioId, "Available scenarios:", scenarios.length);
    const scenario = scenarios.find(s => s.id === gameState.currentScenarioId);
    
    if (scenario) {
      console.log("Found scenario:", scenario.title);
      setCurrentScenario(scenario);
    } else {
      console.warn("No scenario found with ID:", gameState.currentScenarioId);
      // If we can't find the scenario, fall back to the first available scenario
      if (scenarios.length > 0) {
        console.log("Falling back to first scenario:", scenarios[0].title);
        setCurrentScenario(scenarios[0]);
        setGameState(prev => ({
          ...prev,
          currentScenarioId: scenarios[0].id
        }));
      } else {
        console.error("No scenarios available");
        setCurrentScenario(undefined);
      }
    }
  }, [gameState.currentScenarioId, scenarios]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hannibalGameState', JSON.stringify(gameState));
  }, [gameState]);

  const makeDecision = (decision: Decision) => {
    if (!currentScenario) {
      console.error("Cannot make decision: no current scenario");
      return;
    }
    
    console.log("Making decision:", decision.text);
    const { outcomes } = decision;
    
    // Update resources
    const updatedResources = { ...gameState.resources };
    
    if (outcomes.resources) {
      Object.entries(outcomes.resources).forEach(([key, value]) => {
        if (key in updatedResources) {
          updatedResources[key as keyof typeof updatedResources] += value;
          
          // Ensure values stay within 0-100 range
          if (updatedResources[key as keyof typeof updatedResources] > 100) {
            updatedResources[key as keyof typeof updatedResources] = 100;
          }
          
          if (updatedResources[key as keyof typeof updatedResources] < 0) {
            updatedResources[key as keyof typeof updatedResources] = 0;
          }
        }
      });
    }
    
    // Create new history event
    const newEvent: GameEvent = {
      turn: gameState.turn,
      scenarioId: currentScenario.id || '',
      decisionId: decision.id,
      resources: { ...updatedResources },
      description: outcomes.description,
    };
    
    // Check if there's a strategic principle to discover
    if (outcomes.principle && !outcomes.principle.discovered) {
      discoverPrinciple(outcomes.principle);
    }
    
    // Check if we're moving to a new scenario or the game is ending
    const nextScenarioId = outcomes.nextScenarioId || "finale";
    const nextScenario = scenarios.find(s => s.id === nextScenarioId);
    const gameOver = !nextScenario || nextScenario.id === 'game-over' || nextScenario.isFinale;
    
    // Show learning summary if we're moving to a finale or ending
    if (gameOver && currentScenario?.learningSummary) {
      toast.info("Strategic Lessons Learned", {
        description: currentScenario.learningSummary,
        duration: 10000,
      });
    }
    
    // Update game state
    setGameState(prevState => ({
      ...prevState,
      currentScenarioId: nextScenarioId,
      resources: updatedResources,
      history: [...prevState.history, newEvent],
      turn: prevState.turn + 1,
      gameOver: gameOver || false
    }));
  };
  
  const resetGame = () => {
    console.log("Resetting game to initial state");
    setGameState(initialGameState);
    localStorage.removeItem('hannibalGameState');
    toast('Game reset to beginning');
  };
  
  const discoverPrinciple = (principle: StrategicPrinciple) => {
    // Find and update the discovered principle
    const updatedPrinciples = gameState.principles.map(p => 
      p.id === principle.id ? { ...p, discovered: true } : p
    );
    
    setGameState(prevState => ({
      ...prevState,
      principles: updatedPrinciples
    }));
    
    // Show notification
    toast(`Strategic Principle Discovered: ${principle.name}`);
  };

  const addCustomScenario = (scenario: any) => {
    console.log("Adding custom scenario:", scenario);
    
    // Ensure scenario has all required fields
    const preparedScenario = {
      ...scenario,
      decisions: scenario.decisions.map((decision: any) => ({
        ...decision,
        outcomes: {
          ...decision.outcomes,
          nextScenarioId: decision.outcomes.nextScenarioId || 'finale',
          resources: decision.outcomes.resources || { military: 0, economy: 0, morale: 0, political: 0 }
        }
      }))
    };
    
    // Add to scenarios state
    setScenarios(prevScenarios => {
      const newScenarios = [...prevScenarios, preparedScenario];
      
      // Save custom scenarios to localStorage
      const customScenarios = newScenarios.filter(s => !defaultScenarios.some(ds => ds.id === s.id));
      localStorage.setItem('customScenarios', JSON.stringify(customScenarios));
      
      return newScenarios;
    });

    // Start the new scenario
    startNewScenario(preparedScenario.id);
    
    toast.success(`New scenario added: ${preparedScenario.title}`);
  };

  const startNewScenario = (scenarioId: string) => {
    console.log("Starting new scenario:", scenarioId);
    
    if (!scenarioId || !scenarios.some(s => s.id === scenarioId)) {
      console.error("Invalid scenario ID:", scenarioId);
      toast.error("Could not start scenario - invalid ID");
      return;
    }
    
    setGameState({
      ...initialGameState,
      currentScenarioId: scenarioId
    });
    
    // Find and set the current scenario immediately to prevent loading flicker
    const newScenario = scenarios.find(s => s.id === scenarioId);
    if (newScenario) {
      setCurrentScenario(newScenario);
    }
  };
  
  return (
    <GameContext.Provider value={{ 
      gameState, 
      currentScenario, 
      scenarios,
      makeDecision, 
      resetGame, 
      discoverPrinciple,
      addCustomScenario,
      startNewScenario
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
