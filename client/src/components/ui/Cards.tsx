import { FC } from "react";
import { Image } from "./Image";

export const LogoCards: FC<{ os: Array<{ link: string }> }> = ({ os }) => {

  return (
    <>
      {
        os.map((item, idx) => (
          <button key={idx}
            className="h-40 w-40 border-2 rounded-lg overflow-hidden mx-1 hover:border-orange-500">
            <Image link={item.link} />
          </button>

        ))
      }
    </>
  )
}
