
import React, { useState } from 'react';
import { useGame } from './GameContext';
import ScenarioCard from './ScenarioCard';
import DecisionOptions from './DecisionOptions';
import ResourceDisplay from './ResourceDisplay';
import HistoryLog from './HistoryLog';
import StrategicPrinciples from './StrategicPrinciples';
import { Button } from '@/components/ui/button';
import { Scroll, BookOpen, RefreshCcw } from 'lucide-react';

const GameLayout: React.FC = () => {
  const { gameState, currentScenario, resetGame } = useGame();
  const [showHistory, setShowHistory] = useState(false);
  const [showPrinciples, setShowPrinciples] = useState(false);
  
  if (!currentScenario) {
    return <div>Loading scenario...</div>;
  }
  
  return (
    <div className="game-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Strategic Simulation</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowHistory(!showHistory);
              if (showHistory) setShowPrinciples(false);
            }}
            className={showHistory ? 'bg-gold-light' : ''}
          >
            <Scroll className="h-4 w-4 mr-2" />
            History
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowPrinciples(!showPrinciples);
              if (showPrinciples) setShowHistory(false);
            }}
            className={showPrinciples ? 'bg-gold-light' : ''}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Principles
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (window.confirm('Are you sure you want to restart the game?')) {
                resetGame();
              }
            }}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <ResourceDisplay resources={gameState.resources} />
      </div>
      
      <HistoryLog events={gameState.history} isOpen={showHistory} />
      <StrategicPrinciples principles={gameState.principles} isOpen={showPrinciples} />
      
      <ScenarioCard scenario={currentScenario} />
      
      {!gameState.gameOver && <DecisionOptions decisions={currentScenario.decisions} />}
      
      {gameState.gameOver && !currentScenario.isFinale && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Campaign Concluded</h2>
          <Button onClick={resetGame}>Begin New Campaign</Button>
        </div>
      )}
    </div>
  );
};

export default GameLayout;
