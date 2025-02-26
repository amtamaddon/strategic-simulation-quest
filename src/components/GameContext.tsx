
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, Decision, GameEvent, StrategicPrinciple } from '../types/game';
import { initialGameState, scenarios } from '../data/scenarios';
import { toast } from 'sonner';

interface GameContextType {
  gameState: GameState;
  currentScenario: any;
  makeDecision: (decision: Decision) => void;
  resetGame: () => void;
  discoverPrinciple: (principle: StrategicPrinciple) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentScenario, setCurrentScenario] = useState(scenarios.find(s => s.id === initialGameState.currentScenarioId));

  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('hannibalGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setGameState(parsedState);
        setCurrentScenario(scenarios.find(s => s.id === parsedState.currentScenarioId));
      } catch (error) {
        console.error('Failed to parse saved game state:', error);
      }
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hannibalGameState', JSON.stringify(gameState));
  }, [gameState]);

  // Update current scenario whenever currentScenarioId changes
  useEffect(() => {
    setCurrentScenario(scenarios.find(s => s.id === gameState.currentScenarioId));
  }, [gameState.currentScenarioId]);

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