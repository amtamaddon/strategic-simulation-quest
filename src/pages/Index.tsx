
import React from 'react';
import { GameProvider } from '../components/GameContext';
import GameLayout from '../components/GameLayout';

class GameErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Game error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">We apologize for the inconvenience. Please try refreshing the page.</p>
          <pre className="p-4 bg-gray-100 rounded max-w-lg overflow-auto text-sm">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => {
              // Clear any localStorage data that might be causing issues
              localStorage.removeItem('hannibalGameState');
              localStorage.removeItem('customScenarios');
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset and Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Index = () => {
  return (
    <GameErrorBoundary>
      <GameProvider>
        <GameLayout />
      </GameProvider>
    </GameErrorBoundary>
  );
};

export default Index;
