import lckData from "@/data/playerData.json";
import { PlayerInterface } from "../interface/PlayerInterface";

const POSITIONS = ["top", "jug", "mid", "ad", "sup"];
const MAX_TOTAL_PRICE = 15;

// 포지션별 후보 풀을 만든다
export default function getRandomPlayer() {
    const getPositionPools = (): { [key: string]: PlayerInterface[] } => {
      const pools: { [key: string]: PlayerInterface[] } = {
        top: [],
        jug: [],
        mid: [],
        ad: [],
        sup: [],
      };

      console.log(pools);
    
      lckData.lck.forEach(team => {
        team.player.forEach(player => {
          if (pools[player.position]) {
            pools[player.position].push(player);
          }
        });
      });
    
      return pools;
    };

    // 조건을 만족하는 랜덤 조합을 찾는다
    const getValidRandomPlayers = (): { [key: string]: PlayerInterface | null } => {
      const pools = getPositionPools();
      let result: { [key: string]: PlayerInterface | null } = {
        top: null, jug: null, mid: null, ad: null, sup: null
      };
    
      let attempts = 0;
      const maxAttempts = 1000; // 무한 루프 방지
    
      while (attempts < maxAttempts) {
        attempts++;
        const tempResult: { [key: string]: PlayerInterface } = {} as any;
        let totalPrice = 0;
      
        for (const pos of POSITIONS) {
          const candidates = pools[pos];
          const randomPlayer = candidates[Math.floor(Math.random() * candidates.length)];
          tempResult[pos] = randomPlayer;
          totalPrice += randomPlayer.price;
        }
      
        if (totalPrice <= MAX_TOTAL_PRICE) {
          result = tempResult;
          console.log("시도", attempts, "총 가격", totalPrice);
          break;
        }
      }
    
      console.log(result);
      return result;
    };
 return getValidRandomPlayers();    
}