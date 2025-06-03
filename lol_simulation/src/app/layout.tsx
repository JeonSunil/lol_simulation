import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lck선수 15달러 챌린지",
  description: "lck선수 15달러 챌린지",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="
                    w-full
                    h-screen 
                    overflow-y-auto
                    flex 
                    justify-center 
                    items-center
                    flex-col
                    gap-[5vh]
                    bg-gray-400
                    relative
                    ">
          <div className="
                      w-[60vw]
                      h-[80vh] 
                      overflow-y-scroll
                      bg-white
                      ">
            {children}
          </div>
      </body>
    </html>
  );
}


