// * use State같은 상탯값을 활용하기에 use client 사용.
"use client";

import { useEffect, useState } from "react";
import lckData from "@/data/playerData.json";
import { useRouter } from "next/navigation";
import { PlayerInterface, TeamInterface } from "../interface/PlayerInterface";
import { budget } from "@/valueData/valueData";
import { useDispatch, useSelector } from "react-redux";


const position = ["top", "jug", "mid", "ad", "sup"];


// * 셀렉트 페이지 작성 시작
export default function SelectPage() {

  const router = useRouter();

  // * 아래의 fixed 된 박스를 보이고, 안보이고를 결정 하는 상탯값.
  const [view, setview] = useState(true);
  const [message, setMessage] = useState('');

  const [viewByTeam, setViewByTeam] = useState(false);
  // * 
  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: string]: PlayerInterface | null }>({
    top: null,
    jug: null,
    mid: null,
    ad: null,
    sup: null,
  });

  const totalBudget = budget;
  const usedBudget = Object.values(selectedPlayers).reduce(
    (sum, player) => sum + (player ? player.price : 0),
    0
  );
  const remainingBudget = totalBudget - usedBudget;


const handleSelect = (player: PlayerInterface) => {
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
  const grouped: { [price: number]: { [pos: string]: PlayerInterface[] } } = {};

  lckData.lck.forEach((team: TeamInterface) => {
    team.player.forEach((player) => {
      const price = player.price;
      const pos = player.position;

      if (!grouped[price]) grouped[price] = {};
      if (!grouped[price][pos]) grouped[price][pos] = [];

      grouped[price][pos].push(player);
    });
  });

  const priceLevels = [5, 4, 3, 2, 1]; // 높은 가격부터 출력

  useEffect(() => {
    // selectedPlayers 객체를 반복하면서 각 포지션의 선수 정보를 Redux 스토어에 디스패치합니다.
    position.forEach(async (pos) => { // 'position' 배열은 "top", "jug", "mid", "ad", "sup"를 포함합니다.
      const player = selectedPlayers[pos];
      if (player) {
        // 선수가 선택되었으면 해당 포지션과 닉네임을 Redux 스토어에 저장합니다.
        sessionStorage.setItem(pos, player.nickname);
      } else {
        // 선수가 선택되지 않았으면 해당 포지션의 닉네임을 빈 문자열로 초기화합니다.
        setMessage('');
        sessionStorage.removeItem(pos);
      } 
      if(position.every(pos => selectedPlayers[pos] !== null)) {
        setMessage('모든 선수를 선택하셨습니다.')
      }

      });
    }, [selectedPlayers]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6">선수 선택</h1>

      <button
        onClick={() => {router.push('/')}}
        className="fixed left-4 top-4 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400"
      >
        뒤로가기
      </button>

      <button
        onClick={() => setViewByTeam((prev) => !prev)}
        className="fixed right-4 top-4 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400"
      >
        {viewByTeam ? "가격별 보기" : "팀별 보기"}
      </button>

      <button
        onClick={() => setSelectedPlayers({
          top: null,
          jug: null,
          mid: null,
          ad: null,
          sup: null,
        })}
        className=
        {view ?
          "fixed left-4 bottom-45 md:bottom-55 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400"
        :
          "fixed left-4 bottom-5 md:bottom-5 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400"
        }
      >
      초기화 버튼
      </button>

      <button
        onClick={() => setview((prev) => !prev)}
        className=
        {view ?
        "fixed right-4 bottom-45 md:bottom-55 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400"
        :
        "fixed right-4 bottom-5 md:bottom-5 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400"
        }
      >
        {view ? "선수 선택 숨기기" : "선수 선택 보기"}
      </button>

    {/* 위치 고정된 박스 */}
    {view && (
    <div className="w-full fixed bottom-0 right-0 px-3 md:px-[10vw] bg-white border border-black">
      {/* 선택된 선수 리스트 */}
      <div className="flex justify-center items-center gap-5 md:gap-10 mb-4 mt-3 text-center">
        {Object.entries(selectedPlayers).map(([position, player]) => (
          <div key={position} className="w-20 h-25 md:w-40 md:h-35 border p-1 md:p-3 rounded-[10px] min-h-[80px] bg-gray-100 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setSelectedPlayers((prev) => ({
                                      ...prev,
                                    [position]: null, // 해당 포지션만 null로 초기화
                                    }));
                                  }}>
            <div className="text-sm font-semibold uppercase flex justify-center items-center">{position}</div>

            <div className="flex flex-col items-center justify-start">
              {player?.img ? 
              <img src={player?.img} alt={player?.nickname} className="w-10 h-10  md:w-20 md:h-18 border border-black rounded-[10%] object-contain" /> 
              : 
              <div className="w-10 h-10  md:w-20 md:h-18 border border-black rounded-[10px]"></div>
              } 
              {player ? player.nickname : "-"}
              </div>
            </div>
        ))}
      </div>

    {!message ?  
      <div className="text-center text-lg font-semibold mb-3">
        남은 예산: ${remainingBudget}
      </div>
    : 
    <>
      <div className="text-center text-lg font-semibold mb-3">
        {message}
      </div>
      <button className="absolute border py-1 px-6 bottom-2 right-0 md:bottom-3 md:right-3 rounded-[10px] text-white bg-blue-500 hover:bg-blue-400 cursor-pointer shadow-md"
      onClick={() => {router.push('/result')}}
      >확정</button>
    </>
    }

    </div>
    )}


      {/* 테이블 형태 출력 */}
      <div className="overflow-x-auto">
      {!viewByTeam ? (
        <table className="
                          table-fixed
                          border-collapse 
                          w-full 
                          mb-30
                          text-center
                          ">
          <thead>
            <tr>
              <th className="border md:px-4 md:py-2 text-lg bg-gray-200 w-[10%]">$</th>
              {position.map((pos) => (
                <th key={pos} className="border md:px-4 md:py-2 text-lg capitalize bg-gray-100">
                  {pos}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priceLevels.map((price) => (
              <tr key={price}>
                <td className="border md:px-4 md:py-2 font-bold bg-gray-50">{price}$</td>
                {position.map((pos) => (
                  <td key={pos} className="border md:px-4 md:py-2 align-top">
                    {(grouped[price]?.[pos] || []).map((player) => (
                      <div
                        key={player.nickname}
                        onClick={() => handleSelect(player)}
                        className="cursor-pointer flex flex-col p-[10%] items-center hover:bg-gray-200 rounded-[10px] border border-gray-500 my-5"
                      >
                      <img src={player.img} alt={player.nickname} className="w-14 h-12 md:w-20 md:h-18 md:px-2 border border-black rounded-[10%] object-cover" />

                        <div className="text-[1vmax] mt-2 md:text-[16px]">{player.nickname}</div>
                        <div className="text-[1vmax] mt-2 md:text-[16px]">{player.name}</div>
                        <img src={lckData.lck.find((team) =>team.player.some((p) => p.nickname === player.nickname))?.img || ""} alt={lckData.lck.find((team) =>team.player.some((p) => p.nickname === player.nickname))?.team || ""} className="w-10 h-10" />
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
  // 팀별 보기 (새로 작성)
        <div className="space-y-12 mb-30">
          {lckData.lck.map((team: TeamInterface) => {
            // 각 포지션별로 선수 배열 만들기
            const positionMap: { [key: string]: PlayerInterface[] } = {};
            position.forEach((pos) => {
              positionMap[pos] = team.player.filter((p) => p.position === pos);
            });
          
            return (
              <div key={team.team} className="border p-4 pb-8 rounded bg-gray-50 shadow">
                <div className="flex">
                  <img src={team.img} alt={team.team} className="w-15 h-15 md:w-20 md:h-18 object-contain" />
                  <h2 className="text-2xl font-bold flex items-center">{team.team}</h2>
                </div>
            
                {/* 포지션 헤더 */}
                <div className="grid grid-cols-5 gap-4 mb-2 text-center">
                  {position.map((pos) => (
                    <div key={pos} className="font-semibold capitalize text-lg">
                      {pos}
                    </div>
                  ))}
                </div>
                
                {/* 포지션별 선수들을 한 줄씩 배치 */}
                <div className="grid grid-cols-5 gap-4">
                  {position.map((pos) => (
                    <div key={pos} className="space-y-2">
                      {positionMap[pos].map((player) => (
                        <div
                          key={player.nickname}
                          className="border px-2 py-6 rounded-[10px] text-center bg-white hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelect(player)}
                        >
                        <img src={player.img} alt={player.nickname} className="w-14 h-12 md:w-20 md:h-18 border border-black rounded-[10px] mx-auto mb-1 object-contain" />
                        <div className="text-[1vmax] font-medium flex justify-center items-center">{player.nickname}</div>
                        <div className="text-[1vmax] font-medium flex justify-center items-center">{player.name}</div>
                        <div className="text-sm text-gray-500 flex justify-center items-center">${player.price}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}