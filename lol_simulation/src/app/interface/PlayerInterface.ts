export interface PlayerInterface {
  position: string;
  name: string;
  nickname: string;
  price: number;
  img?: string;
}

export interface TeamInterface {
  team: string;
  img: string;
  player: PlayerInterface[];
}

export interface MyTeamInterface {
  view:boolean;
  remainingBudget:number;
}