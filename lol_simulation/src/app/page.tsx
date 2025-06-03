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
      <p className="text-5xl 
                    text-center
                    ">
                    LCK 선수 15$ 챌린지
                    </p>
      <button className="
              cursor-pointer 
              px-[100px] 
              py-[30px] 
              border 
              rounded-[10px]
              border-black
              bg-gray-100
              hover:bg-gray-500
              "
              onClick={handleClick}>
              시작하기
              </button>
    </div>
  );
}
