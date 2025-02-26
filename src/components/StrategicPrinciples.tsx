
import React from 'react';
import { StrategicPrinciple } from '../types/game';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StrategicPrinciplesProps {
  principles: StrategicPrinciple[];
  isOpen: boolean;
}

const StrategicPrinciples: React.FC<StrategicPrinciplesProps> = ({ principles, isOpen }) => {
  if (!isOpen) return null;
  
  const discoveredPrinciples = principles.filter(p => p.discovered);
  
  return (
    <div className="parchment-card mb-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Strategic Principles Discovered</h3>
      
      <ScrollArea className="h-80">
        <div className="space-y-4">
          {discoveredPrinciples.length === 0 ? (
            <p className="text-ink-light italic">Principles you discover will appear here...</p>
          ) : (
            discoveredPrinciples.map((principle) => (
              <div key={principle.id} className="border-b border-parchment-dark pb-3 mb-3 last:border-0">
                <div className="flex justify-between mb-1">
                  <span className="text-gold-dark font-medium">{principle.name}</span>
                  <span className="text-xs text-ink-light">{principle.author}</span>
                </div>
                <p className="text-ink text-sm">{principle.description}</p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StrategicPrinciples;
