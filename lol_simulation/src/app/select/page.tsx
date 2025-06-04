// * use State같은 상탯값을 활용하기에 use client 사용.
"use client";

import { useState } from "react";
import lckData from "@/data/playerData.json";
import { useRouter } from "next/navigation";

// *  플레이어 인터페이스 => 추 후 데이터 베이스를 활용한다면, dto가 이런 형식으로 되겠지
interface Player {
  position: string;
  name: string;
  nickname: string;
  price: number;
}

// * json데이터의 형식에 맞추어 인터페이스를 작성 아래의 player[] 배열은 위의 인터페이스 내용이 들어가는 배열이 될 것.
interface Team {
  team: string;
  player: Player[];
}

// * 포지션은 총 5개 입니다.
const POSITIONS = ["top", "jug", "mid", "ad", "sup"];

// * 셀렉트 페이지 작성 시작
export default function SelectPage() {

  const router = useRouter();

  // * 아래의 fixed 된 박스를 보이고, 안보이고를 결정 하는 상탯값.
  const [view, setview] = useState(true)
  // * 
  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: string]: Player | null }>({
    top: null,
    jug: null,
    mid: null,
    ad: null,
    sup: null,
  });

  const totalBudget = 15;
  const usedBudget = Object.values(selectedPlayers).reduce(
    (sum, player) => sum + (player ? player.price : 0),
    0
  );
  const remainingBudget = totalBudget - usedBudget;

  // const handleSelect = (player: Player) => {
  //   setSelectedPlayers((prev) => ({
  //     ...prev,
  //     [player.position]: player,
  //   }));
  // };
const handleSelect = (player: Player) => {
  const currentPlayer = selectedPlayers[player.position];
  const currentBudget = player.price - (currentPlayer?.price || 0); // 이미 선택된 선수와 교체 시 차액

  if (remainingBudget < currentBudget) {
    alert("예산이 부족합니다!");
    return;
  }

  setSelectedPlayers((prev) => ({
    ...prev,
    [player.position]: player,
  }));
};


  // [position][price] 구조로 선수 분류
  const grouped: { [price: number]: { [pos: string]: Player[] } } = {};

  lckData.lck.forEach((team: Team) => {
    team.player.forEach((player) => {
      const price = player.price;
      const pos = player.position;

      if (!grouped[price]) grouped[price] = {};
      if (!grouped[price][pos]) grouped[price][pos] = [];

      grouped[price][pos].push(player);
    });
  });

  const priceLevels = [5, 4, 3, 2, 1]; // 높은 가격부터 출력

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6">선수 선택</h1>

      <button
        onClick={() => {router.push('/')}}
        className="fixed left-4 top-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md z-50 cursor-pointer hover:bg-blue-400"
      >
        뒤로가기
      </button>

      <button
        onClick={() => setSelectedPlayers({
          top: null,
          jug: null,
          mid: null,
          ad: null,
          sup: null,
        })}
        className="fixed left-4 bottom-[160px] bg-blue-500 text-white px-4 py-2 rounded shadow-md z-50 cursor-pointer hover:bg-blue-400"
      >
      초기화 버튼
      </button>

      <button
        onClick={() => setview((prev) => !prev)}
        className="fixed right-4 bottom-[160px] bg-blue-500 text-white px-4 py-2 rounded shadow-md z-50 cursor-pointer hover:bg-blue-400"
      >
        {view ? "선수 선택 숨기기" : "선수 선택 보기"}
      </button>

    {/* 위치 고정된 박스 */}
    {view && (
    <div className="w-full fixed bottom-0 right-0 px-[20vw] bg-white border border-black">
      {/* 선택된 선수 리스트 */}
      <div className="grid grid-cols-5 gap-4 mb-4 mt-3 text-center">
        {Object.entries(selectedPlayers).map(([position, player]) => (
          <div key={position} className="border p-4 rounded-lg min-h-[80px] bg-gray-100">
            <div className="text-sm font-semibold uppercase">{position}</div>
            <div className="text-lg cursor-pointer hover:text-blue-500" 
            onClick={() => {
              setSelectedPlayers((prev) => ({
                                          ...prev,
                                        [position]: null, // 해당 포지션만 null로 초기화
                                        }));
                                      }}>{player ? player.nickname : "-"}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-lg font-semibold mb-3">
        남은 예산: ${remainingBudget}
      </div>
    </div>
    )}
      {/* 테이블 형태 출력 */}
      <div className="overflow-x-auto">
        <table className="
                          table-auto 
                          border-collapse 
                          w-full 
                          mb-20
                          text-center
                          ">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-lg bg-gray-200">$</th>
              {POSITIONS.map((pos) => (
                <th key={pos} className="border px-4 py-2 text-lg capitalize bg-gray-100">
                  {pos}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priceLevels.map((price) => (
              <tr key={price}>
                <td className="border px-4 py-2 font-bold text-center bg-gray-50">{price}$</td>
                {POSITIONS.map((pos) => (
                  <td key={pos} className="border px-4 py-2 align-top">
                    {(grouped[price]?.[pos] || []).map((player) => (
                      <div
                        key={player.nickname}
                        onClick={() => handleSelect(player)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        {player.nickname}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}