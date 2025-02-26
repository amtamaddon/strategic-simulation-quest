
import React from 'react';
import { Scenario } from '../types/game';
import { useGame } from './GameContext';

const ScenarioCard: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  return (
    <div className="parchment-card mb-6 animate-fade-in">
      <div className="scroll-decoration"></div>
      <div className="mb-2">
        <span className="text-gold-dark text-sm font-medium">{scenario.year}</span>
      </div>
      <h1 className="chapter-title">{scenario.title}</h1>
      <h2 className="text-xl mb-4">You are <span className="text-gold-dark font-semibold">{scenario.leader}</span></h2>
      
      <div className="prose prose-slate max-w-none">
        <p className="scenario-text">{scenario.context}</p>
        <p className="scenario-text">{scenario.situation}</p>
      </div>
      
      {scenario.isFinale && scenario.historicalOutcome && (
        <div className="mt-6 pt-4 border-t border-parchment-dark">
          <h3 className="text-lg font-semibold mb-2">Historical Outcome</h3>
          <p className="text-ink-light">{scenario.historicalOutcome}</p>
        </div>
      )}
    </div>
  );
};

export default ScenarioCard;
