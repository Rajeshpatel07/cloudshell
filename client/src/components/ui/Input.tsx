import { FC } from "react";


interface fields {
  fields: Array<{
    title: string;
    name: string;
    type: string;
  }>
}

export const FormInput: FC<fields> = ({ fields }) => {
  return (
    <>
      {fields.map((field, idx) => (
        <div key={idx} className={`col-span-6 ${idx == 2 ? "" : "sm:col-span-3"}`}>
          <label htmlFor={field.title}
            className="block text-sm font-medium text-gray-700 dark:text-white">
            {field.title}
          </label>

          <input
            type={field.type}
            id={field.title}
            name={field.name}
            className="mt-1 text-3xl w-full rounded-md border-black bg-gray-200 text-gray-700 "
          />
        </div>
      ))

      }
    </>
  )
}
