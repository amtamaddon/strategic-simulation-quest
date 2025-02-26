
import React from 'react';
import { GameEvent } from '../types/game';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryLogProps {
  events: GameEvent[];
  isOpen: boolean;
}

const HistoryLog: React.FC<HistoryLogProps> = ({ events, isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="parchment-card mb-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Campaign History</h3>
      
      <ScrollArea className="h-80">
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-ink-light italic">Your campaign history will appear here...</p>
          ) : (
            events.map((event, index) => (
              <div key={index} className="border-b border-parchment-dark pb-3 mb-3 last:border-0">
                <div className="flex justify-between mb-2">
                  <span className="text-gold-dark font-medium">Turn {event.turn}</span>
                </div>
                <p className="text-ink text-sm">{event.description}</p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HistoryLog;
