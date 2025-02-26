
import React, { useState } from 'react';
import { useGame } from './GameContext';
import ScenarioCard from './ScenarioCard';
import DecisionOptions from './DecisionOptions';
import HistoryLog from './HistoryLog';
import StrategicPrinciples from './StrategicPrinciples';
import ScenarioGenerator from './ScenarioGenerator';
import { Button } from '@/components/ui/button';
import { Scroll, BookOpen, RefreshCcw, PlusCircle, XCircle, Sparkles } from 'lucide-react';

const GameLayout: React.FC = () => {
  const { gameState, currentScenario, resetGame, addCustomScenario, scenarios, startNewScenario } = useGame();
  const [showHistory, setShowHistory] = useState(false);
  const [showPrinciples, setShowPrinciples] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showScenarioList, setShowScenarioList] = useState(false);
  
  if (!currentScenario) {
    return <div>Loading scenario...</div>;
  }
  
  return (
    <div className="game-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Strategic Simulation</h1>
        <div className="space-x-2 flex flex-wrap justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowGenerator(!showGenerator);
              if (showGenerator) {
                setShowScenarioList(false);
                setShowHistory(false);
                setShowPrinciples(false);
              }
            }}
            className={showGenerator ? 'bg-gold-light' : ''}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {showGenerator ? 'Hide Generator' : 'Create Scenario'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowScenarioList(!showScenarioList);
              if (showScenarioList) {
                setShowGenerator(false);
                setShowHistory(false);
                setShowPrinciples(false);
              }
            }}
            className={showScenarioList ? 'bg-gold-light' : ''}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Scenarios
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowHistory(!showHistory);
              if (showHistory) {
                setShowGenerator(false);
                setShowScenarioList(false);
                setShowPrinciples(false);
              }
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
              if (showPrinciples) {
                setShowGenerator(false);
                setShowScenarioList(false);
                setShowHistory(false);
              }
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
      
      {showGenerator && (
        <ScenarioGenerator onNewScenario={addCustomScenario} />
      )}
      
      {showScenarioList && (
        <div className="parchment-card mb-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Available Scenarios</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowScenarioList(false)}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {scenarios.map(scenario => (
              <div key={scenario.id} className="p-3 border border-parchment-dark rounded-md hover:bg-parchment-light cursor-pointer"
                onClick={() => {
                  startNewScenario(scenario.id);
                  setShowScenarioList(false);
                }}
              >
                <div className="flex justify-between">
                  <h4 className="font-semibold">{scenario.title}</h4>
                  <span className="text-sm text-gold-dark">{scenario.year}</span>
                </div>
                <p className="text-sm text-ink-light">{scenario.leader}</p>
                <p className="text-xs truncate mt-1">{scenario.context.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
      
      {currentScenario.learningSummary && (
        <div className="mt-6 parchment-card animate-fade-in">
          <h3 className="text-xl font-semibold mb-2">Strategic Lessons</h3>
          <p className="text-ink">{currentScenario.learningSummary}</p>
        </div>
      )}
    </div>
  );
};

export default GameLayout;
