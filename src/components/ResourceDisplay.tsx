
import React from 'react';
import { Resources } from '../types/game';
import { Sword, Coins, Heart, Crown } from 'lucide-react';

interface ResourceDisplayProps {
  resources: Resources;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-parchment-light border border-parchment-dark rounded-md p-4 shadow-sm">
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${getResourceColor('military', resources.military)}`}>
          <Sword className="h-5 w-5 text-ink-dark" />
        </div>
        <div className="ml-2">
          <div className="text-xs text-ink-light">Military</div>
          <div className="font-semibold">{resources.military}</div>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${getResourceColor('economy', resources.economy)}`}>
          <Coins className="h-5 w-5 text-ink-dark" />
        </div>
        <div className="ml-2">
          <div className="text-xs text-ink-light">Economy</div>
          <div className="font-semibold">{resources.economy}</div>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${getResourceColor('morale', resources.morale)}`}>
          <Heart className="h-5 w-5 text-ink-dark" />
        </div>
        <div className="ml-2">
          <div className="text-xs text-ink-light">Morale</div>
          <div className="font-semibold">{resources.morale}</div>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${getResourceColor('political', resources.political)}`}>
          <Crown className="h-5 w-5 text-ink-dark" />
        </div>
        <div className="ml-2">
          <div className="text-xs text-ink-light">Political</div>
          <div className="font-semibold">{resources.political}</div>
        </div>
      </div>
    </div>
  );
};

function getResourceColor(type: keyof Resources, value: number): string {
  if (value < 30) return 'bg-red-100';
  if (value < 60) return 'bg-yellow-100';
  return 'bg-green-100';
}

export default ResourceDisplay;
