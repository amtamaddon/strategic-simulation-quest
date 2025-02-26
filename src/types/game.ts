
export type ResourceType = 'military' | 'economy' | 'morale' | 'political';

export interface Resources {
  military: number;
  economy: number;
  morale: number;
  political: number;
}

export interface Outcome {
  description: string;
  resources: Partial<Resources>;
  nextScenarioId: string;
  principle?: StrategicPrinciple;
}

export interface Decision {
  id: string;
  text: string;
  description: string;
  outcomes: Outcome;
}

export interface Scenario {
  id: string;
  title: string;
  year: string;
  leader: string;
  context: string;
  situation: string;
  decisions: Decision[];
  backgroundImage?: string;
  historicalOutcome?: string;
  isFinale?: boolean;
  learningSummary?: string;
}

export interface GameState {
  currentScenarioId: string;
  resources: Resources;
  history: GameEvent[];
  turn: number;
  gameOver: boolean;
  principles: StrategicPrinciple[];
}

export interface GameEvent {
  turn: number;
  scenarioId: string;
  decisionId: string | null;
  resources: Resources;
  description: string;
}

export interface StrategicPrinciple {
  id: string;
  name: string;
  author: string;
  description: string;
  discovered: boolean;
}
