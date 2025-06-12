import lckData from "@/data/playerData.json";
import { PlayerInterface } from "../interface/PlayerInterface";
import { draw_probability, win_probability } from "@/valueData/valueData";


export function fightResult(players: string[], randomPlayer: { [key: string]: PlayerInterface | null }) {
    const decideWinner = () => {
    const playerTeam = lckData.lck
      .flatMap(team => team.player)
      .filter(p => players.includes(p.nickname));

    const playerTeamPrice = playerTeam.reduce((sum, p) => sum + p.price, 0);
    const randomTeamPrice = Object.values(randomPlayer)
      .filter(p => p !== null)
      .reduce((sum, p) => sum + (p!.price || 0), 0);

    console.log("사용자 팀 가격:", playerTeamPrice);
    console.log("랜덤 팀 가격:", randomTeamPrice);

    let winner = "";
    const rand = Math.random();

    if (playerTeamPrice > randomTeamPrice) {
      winner = rand < win_probability ? "player" : "random";
    } else if (playerTeamPrice < randomTeamPrice) {
      winner = rand < win_probability ? "random" : "player";
    } else {
      winner = rand < draw_probability ? "player" : "random";
    }

    return winner;
  };
  return decideWinner();
}