'use client'

import { RootState } from "@/store";
import { setPlayer } from "@/store/slice/playerSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerInterface } from "../interface/PlayerInterface";
import lckData from "@/data/playerData.json";
import getRandomPlayer from "../util/randomPlayer";
import { fightResult } from "../util/fightResult";


const position = ["top", "jug", "mid", "ad", "sup"];

export default function ResultPage() {
  // const disPatch = useDispatch();
  // const totalPlayer = useSelector((state: RootState) =>  state.player)
  const [players, setPlayers] = useState<string[]>([]);
  const [randomPlayer, setRandomPlayer] = useState<{ [key: string]: PlayerInterface | null }>({
    top: null,
    jug: null,
    mid: null,
    ad: null,
    sup: null,
  });
  const [fight, setFight] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [userWin, setUserWin] = useState(false);

  useEffect(() => {
    const stored = position.map((key) => sessionStorage.getItem(key) || '');
    setPlayers(stored);
  }, []);

  useEffect(() => {
    const stored = position.map((key) => sessionStorage.getItem(key) || '');
    setPlayers(stored);
  }, []);

  const router = useRouter();
  const [nickName, setNickName] = useState<{ [key: string]: PlayerInterface | null }>({
      top: null,
      jug: null,
      mid: null,
      ad: null,
      sup: null,
    })

  // console.log(totalPlayer);

  // useEffect(() => {
  //   [totalPlayer].map((player) => {
  //     position.map((pos) => {
  //       console.log(player[pos].nickName);
  //     })
  //   })
  // },[]);

  const deleteSession = () => {
    position.forEach((key) => {
      sessionStorage.removeItem(key);
    })
  }

  useEffect(() => {
    if (players.length === 5 && players.every(p => p !== '')) {
      const randomTeam = getRandomPlayer(players);
      console.log(randomTeam);
      setRandomPlayer(randomTeam);
    }
  }, [players]);

  useEffect(() => {
  console.log(randomPlayer);
  }, [randomPlayer]);






  return (
    <div className="flex flex-row md:flex-col justify-around h-[80vh]">
    
    {/* 처음으로 버튼 */}
    {/* <button onClick={() => {deleteSession(); router.push('/')}} 
    className="fixed left-4 top-4 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400">
      처음으로
    </button> */}

    {/* 대결 버튼 */}
    {fight ?
    ''
    :
    <button 
    onClick={() => {const result = fightResult(players, randomPlayer); 
                    {result === 'player' ? setUserWin(true) : setUserWin(false)}; 
                    setFight(true);
                    setResultModalOpen(true);
                  }} 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400">
      대결
    </button>}

    {/* 모달 창 */}
    {resultModalOpen && 
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white flex flex-col justify-around items-center shadow-2xl border rounded-[10px] p-15">
      <div className="text-xl font-bold">
      {userWin ? '승리하셨습니다.' : '패배하셨습니다.'}
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-[10px] shadow-md z-50 cursor-pointer hover:bg-blue-400"
              onClick={() => {router.push('/')}}>
        처음으로
      </button>
    </div>
    }
    
    {/* 유저가 선택한 선수 목록 */}
    <div className={
      !resultModalOpen ?
      "flex flex-col justify-center items-center w-[100%] h-[100%] bg-white"
      : userWin ?
      "flex flex-col justify-center items-center w-[100%] h-[100%] bg-blue-400"
      : 
      "flex flex-col justify-center items-center w-[100%] h-[100%] bg-red-400"
      }>
        <div className={
          !resultModalOpen ? 
          "text-xl font-bold xlshadow-2xl" 
          : 
          "text-xl font-bold xlshadow-2xl text-white"}>
            유저의 선택
          </div>
      <div className="flex flex-col md:flex-row mt-5">
        {players.map((item, i) => {
          const match = lckData.lck
                        .flatMap((team) => team.player) // 모든 player를 하나의 배열로
                        .find((p) => p.nickname === item);

                return <div key={position[i]} className="flex flex-col">
                          <img src={match?.img} alt={item} className="w-20 h-25 md:w-30 md:h-37 object-cover"/>
                          <div className="text-center bg-white shadow-2xl border rounded-b-[5px]">{item}</div>
                      </div>

              })
            }
          </div>
        </div>

        {/* 랜덤선수 조합 */}
        <div className={
          !resultModalOpen ?
          "flex flex-col justify-center items-center w-[100%] h-[100%] bg-white"
          : userWin ?
          "flex flex-col justify-center items-center w-[100%] h-[100%] bg-red-400"
          : 
          "flex flex-col justify-center items-center w-[100%] h-[100%] bg-blue-400"
          }>
            
          <div className="flex flex-col md:flex-row mb-5">
            {position.map((pos) => {
              const item = randomPlayer[pos];
                if (!item) return null;
              
                return (
                  <div key={pos} className="flex flex-col">
                    <img src={item.img} alt={item.nickname} className="w-20 h-25 md:w-30 md:h-37 object-cover" />
                    <div className="text-center bg-white shadow-2xl border rounded-b-[5px]">{item.nickname}</div>
                  </div>
                );
              })}
          </div>
                  <div className={
                    !resultModalOpen ? 
                    "text-xl font-bold xlshadow-2xl" 
                    : 
                    "text-xl font-bold xlshadow-2xl text-white"}>
                      상대의 선택
                  </div>

        </div>

      </div>
  )

}