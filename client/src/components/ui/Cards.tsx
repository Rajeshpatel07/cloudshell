import React, { FC } from "react";

interface LogoCardsProps {
  operatingSystems: Array<{ link: string, name: string }>,
  selectedOS: string | null;
  setSelectedOS: React.Dispatch<React.SetStateAction<string | null>>;
}

export const LogoCards: FC<LogoCardsProps> = React.memo(({ operatingSystems, selectedOS, setSelectedOS }) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {operatingSystems.map((os) => (
        <button
          key={os.name}
          className={`bg-gray-900 p-4 rounded-lg cursor-pointer transition-all ${selectedOS === os.name ? "ring-2 ring-blue-500" : ""
            } hover:ring-blue-500 hover:ring-2`}
          onClick={() => setSelectedOS(os.name)}
        >
          <img
            src={os.link}
            alt={os.name}
            className="w-full h-24 object-contain mb-2"
          />
          <p className="text-center">{os.name}</p>
        </button>
      ))}
    </div>

  );
});
