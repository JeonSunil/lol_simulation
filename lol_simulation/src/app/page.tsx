'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter()

  const handleClick = () => {router.push('/select')}


  
  return (
    <div className="w-[100%]
                    h-[100%]
                    flex 
                    flex-col 
                    justify-center 
                    items-center
                    gap-10
                    ">
      <img src="/lol_simul.png" alt="LCK 시뮬 이미지" className="w-60 h-60 md:w-80 md:h-80" />
      <button className="
                      bg-blue-500 
                      text-white 
                      px-4 
                      py-2 
                      rounded-[10px] 
                      shadow-md 
                      z-50 
                      cursor-pointer 
                      hover:bg-blue-400
                      w-40
                      h-10

              "
              onClick={handleClick}>
              시작하기
              </button>
    </div>
  );
}
