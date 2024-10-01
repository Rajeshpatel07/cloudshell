import React, { FC } from "react";


interface field {
  field: {
    title: string;
    name: string;
    type: string;
  },
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export const FormInput: FC<field> = ({ field, setState }) => {
  return (
    <div className={`col-span-6 `}>
      <label htmlFor={field.title}
        className="block text-sm font-medium text-black dark:text-white">
        {field.title}
      </label>

      <input
        type={field.type}
        id={field.title}
        name={field.name}
        onChange={(e) => setState(e.target.value)}
        autoComplete="off"
        className="mt-2 text-xl h-10 font-bold w-full rounded border-black bg-gray-200 text-black dark:text-white dark:bg-gray-800"
      />
    </div>
  )
}
