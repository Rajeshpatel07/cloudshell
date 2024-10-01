import React, { FC } from "react";
import { Image } from "./Image";

interface LogoCardsProps {
  os: Array<{ link: string, name: string }>,
  selectImage: string | null;
  setSelectImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const LogoCards: FC<LogoCardsProps> = React.memo(({ os, selectImage, setSelectImage }) => {
  const handleImageSelection = (name: string) => {
    setSelectImage(name);
  };

  return (
    <>
      {os.map((item, idx) => (
        <button
          key={idx}
          className={`h-32 w-32 border-4 rounded-lg overflow-hidden mx-1 transition-all duration-300 ${selectImage === item.name ? 'border-orange-500' : 'border-gray-300'
            } hover:border-orange-500`}
          name={item.name}
          onClick={() => handleImageSelection(item.name)}
        >
          <Image link={item.link} />
        </button>
      ))}
    </>
  );
});
