export interface BuzzEvent {
  playerId: string;
  timestamp: number;
}

export interface BuzzerState {
  isActive: boolean;
  buzzEvents: BuzzEvent[];
  firstBuzzPlayerId: string | null;
  lockedOutPlayerIds: string[];
}

export const initialBuzzerState: BuzzerState = {
  isActive: false,
  buzzEvents: [],
  firstBuzzPlayerId: null,
  lockedOutPlayerIds: [],
};
