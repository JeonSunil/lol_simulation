import lckData from "@/data/playerData.json";
import { PlayerInterface } from "../interface/PlayerInterface";


export function fightResult(players: string[], randomPlayer: { [key: string]: PlayerInterface | null }) {
    const decideWinner = () => {
    const playerTeam = lckData.lck
      .flatMap(team => team.player)
      .filter(p => players.includes(p.nickname));

    const playerTeamPrice = playerTeam.reduce((sum, p) => sum + p.price, 0);
    const randomTeamPrice = Object.values(randomPlayer)
      .filter(p => p !== null)
      .reduce((sum, p) => sum + (p!.price || 0), 0);

    console.log("👤 사용자 팀 가격:", playerTeamPrice);
    console.log("🎲 랜덤 팀 가격:", randomTeamPrice);

    let winner = "";
    const rand = Math.random(); // 0 ~ 1 사이 무작위 수

    if (playerTeamPrice > randomTeamPrice) {
      winner = rand < 0.8 ? "player" : "random";
    } else if (playerTeamPrice < randomTeamPrice) {
      winner = rand < 0.8 ? "random" : "player";
    } else {
      winner = rand < 0.5 ? "player" : "random";
    }

    return winner;
  };
  return decideWinner();
}