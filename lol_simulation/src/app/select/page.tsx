"use client";

import { useState } from "react";
import lckData from "@/data/playerData.json";

interface Player {
  position: string;
  name: string;
  nickname: string;
  price: number;
}

interface Team {
  team: string;
  player: Player[];
}

const POSITIONS = ["top", "jug", "mid", "ad", "sup"];

export default function SelectPage() {
  const [view, setview] = useState(true)
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

  const handleSelect = (player: Player) => {
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

    <div className="w-full fixed bottom-0 right-0 px-[20vw] bg-white border border-black">
      {/* 선택된 선수 리스트 */}
      <div className="grid grid-cols-5 gap-4 mb-4 mt-3 text-center">
        {Object.entries(selectedPlayers).map(([position, player]) => (
          <div key={position} className="border p-4 rounded-lg min-h-[80px] bg-gray-100">
            <div className="text-sm font-semibold uppercase">{position}</div>
            <div className="text-lg">{player ? player.nickname : "-"}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-lg font-semibold mb-3">
        남은 예산: ${remainingBudget}
      </div>
    </div>

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