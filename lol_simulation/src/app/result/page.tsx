'use client'

import { RootState } from "@/store";
import { setPlayer } from "@/store/slice/playerSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerInterface } from "../interface/PlayerInterface";
import lckData from "@/data/playerData.json";
import getRandomPlayer from "../util/randomPlayer";


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
  const randomTeam = getRandomPlayer();
  console.log(randomTeam);
  setRandomPlayer(randomTeam);
  }, []);

  useEffect(() => {
  console.log(randomPlayer);
  }, [randomPlayer]);




  return (
    <div>
    <button onClick={() => {deleteSession(); router.push('/')}}>처음으로</button>
    <div className="flex justify-around items-center w-[100%] h-[100%]">
      <div className="flex flex-col md:flex-row">
      {players.map((item, i) => {
          const match = lckData.lck
                        .flatMap((team) => team.player) // 모든 player를 하나의 배열로
                        .find((p) => p.nickname === item);

              return <div key={position[i]} className="flex flex-col justify-center items-center">
                        <img src={match?.img} alt={item} className="w-20 h-25 md:w-30 md:h-37"/>
                        <div>{item}</div>
                    </div>
        
          })
        }
        </div>
    </div>
    </div>
  )

}