type GameTypeAPIOutput = {
  id: number;
  hostNickname: string;
  guestNickname?: string;
  numbeOfRounds: number;
};

type PlayerTypeAPIOutput = {
  nickname: string;
};

type RoundTypeAPIOutput = {
  id: number;
  gameId: number;
  hostAction: string;
  guestAction: string;
  winnerNickname: string;
  winnerAction: string;
};

export type {
  GameTypeAPIOutput,
  PlayerTypeAPIOutput,
  RoundTypeAPIOutput,
};
