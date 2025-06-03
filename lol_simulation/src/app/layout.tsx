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
                    w-[100vw] 
                    h-[100vh] 
                    flex 
                    justify-center 
                    items-center
                    flex-col
                    gap-[5vh]
                    ">
        {children}
      </body>
    </html>
  );
}


