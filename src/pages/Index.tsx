
import React from 'react';
import { GameProvider } from '../components/GameContext';
import GameLayout from '../components/GameLayout';

const Index = () => {
  return (
    <GameProvider>
      <GameLayout />
    </GameProvider>
  );
};

export default Index;
