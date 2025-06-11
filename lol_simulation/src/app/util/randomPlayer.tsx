import lckData from "@/data/playerData.json";
import { PlayerInterface } from "../interface/PlayerInterface";
import { budget } from "@/valueData/valueData";

const POSITIONS = ["top", "jug", "mid", "ad", "sup"];
const MAX_TOTAL_PRICE = budget;

export default function getRandomPlayer(excludeNicknames: string[] = []) {
  console.log(excludeNicknames);
  const getPositionPools = (): { [key: string]: PlayerInterface[] } => {
    const pools: { [key: string]: PlayerInterface[] } = {
      top: [], jug: [], mid: [], ad: [], sup: [],
    };

    lckData.lck.forEach(team => {
      team.player.forEach(player => {
        if (
          pools[player.position] &&
          !excludeNicknames.includes(player.nickname)
        ) {
          pools[player.position].push(player);
        }
      });
    });

    return pools;
  };

  const getValidRandomPlayers = (): { [key: string]: PlayerInterface | null } => {
    const pools = getPositionPools();
    let result: { [key: string]: PlayerInterface | null } = {
      top: null, jug: null, mid: null, ad: null, sup: null
    };

    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
      attempts++;
      const tempResult: { [key: string]: PlayerInterface } = {} as any;
      const usedNicknames = new Set<string>();
      let totalPrice = 0;

      for (const pos of POSITIONS) {
        const candidates = pools[pos].filter(p => !usedNicknames.has(p.nickname));
        if (candidates.length === 0) break;

        const randomPlayer = candidates[Math.floor(Math.random() * candidates.length)];
        tempResult[pos] = randomPlayer;
        totalPrice += randomPlayer.price;
        usedNicknames.add(randomPlayer.nickname);
      }

      if (Object.keys(tempResult).length === 5 && totalPrice <= MAX_TOTAL_PRICE) {
        result = tempResult;
        break;
      }
    }

    return result;
  };

  return getValidRandomPlayers();
}