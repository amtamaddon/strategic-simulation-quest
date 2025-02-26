
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, Decision, GameEvent, StrategicPrinciple, Scenario } from '../types/game';
import { initialGameState, scenarios as defaultScenarios, strategicPrinciples } from '../data/scenarios';
import { toast } from 'sonner';

interface GameContextType {
  gameState: GameState;
  currentScenario: any;
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
    // Load game state
    const savedState = localStorage.getItem('hannibalGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setGameState(parsedState);
      } catch (error) {
        console.error('Failed to parse saved game state:', error);
      }
    }

    // Load custom scenarios
    const savedScenarios = localStorage.getItem('customScenarios');
    if (savedScenarios) {
      try {
        const parsedScenarios = JSON.parse(savedScenarios);
        setScenarios([...defaultScenarios, ...parsedScenarios]);
      } catch (error) {
        console.error('Failed to parse saved scenarios:', error);
      }
    }
  }, []);

  // Update current scenario whenever currentScenarioId or scenarios change
  useEffect(() => {
    const scenario = scenarios.find(s => s.id === gameState.currentScenarioId);
    setCurrentScenario(scenario);
  }, [gameState.currentScenarioId, scenarios]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hannibalGameState', JSON.stringify(gameState));
  }, [gameState]);

  const makeDecision = (decision: Decision) => {
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
      scenarioId: currentScenario?.id || '',
      decisionId: decision.id,
      resources: { ...updatedResources },
      description: outcomes.description,
    };
    
    // Check if there's a strategic principle to discover
    if (outcomes.principle && !outcomes.principle.discovered) {
      discoverPrinciple(outcomes.principle);
    }
    
    // Check if we're moving to a new scenario or the game is ending
    const nextScenario = scenarios.find(s => s.id === outcomes.nextScenarioId);
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
      currentScenarioId: outcomes.nextScenarioId,
      resources: updatedResources,
      history: [...prevState.history, newEvent],
      turn: prevState.turn + 1,
      gameOver: gameOver || false
    }));
    
    // Show notification for significant resource changes
    const significantChange = Object.entries(outcomes.resources || {}).find(([_, value]) => Math.abs(value) >= 15);
    if (significantChange) {
      const [resource, value] = significantChange;
      const resourceName = resource.charAt(0).toUpperCase() + resource.slice(1);
      const message = value > 0 
        ? `${resourceName} increased significantly!` 
        : `${resourceName} decreased significantly!`;
      toast(message);
    }
  };
  
  const resetGame = () => {
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
    // Prepare the scenario with default next scenario links
    const preparedScenario = {
      ...scenario,
      decisions: scenario.decisions.map((decision: any) => ({
        ...decision,
        outcomes: {
          ...decision.outcomes,
          nextScenarioId: decision.outcomes.nextScenarioId || 'finale'
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
  };

  const startNewScenario = (scenarioId: string) => {
    setGameState({
      ...initialGameState,
      currentScenarioId: scenarioId
    });
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
