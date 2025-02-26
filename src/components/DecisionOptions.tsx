
import React from 'react';
import { Decision } from '../types/game';
import { useGame } from './GameContext';
import { ChevronRight } from 'lucide-react';

const DecisionOptions: React.FC<{ decisions: Decision[] }> = ({ decisions }) => {
  const { makeDecision } = useGame();

  return (
    <div className="mt-6 space-y-4 animate-slide-up">
      <h3 className="text-xl font-semibold mb-4">What will you decide?</h3>
      
      <div className="space-y-3">
        {decisions.map((decision) => (
          <div key={decision.id} className="flex flex-col">
            <button 
              className="decision-btn"
              onClick={() => makeDecision(decision)}
            >
              <span className="flex-1">{decision.text}</span>
              <ChevronRight className="h-5 w-5 text-gold-dark" />
            </button>
            <p className="text-sm text-ink-light ml-2 mt-1">{decision.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionOptions;
