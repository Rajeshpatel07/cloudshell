import { FC, ReactNode } from "react";
import { FormInput } from "./ui/Input";
import { SimpleButton } from "./ui/Buttons";
import { fields } from "../data/Form";



const Form: FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          {children}
        </div>
        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
          {
            fields.map((item, idx) => (
              <FormInput field={item} key={idx} />
            ))
          }
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <SimpleButton title="Create an account" />
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <a href="#" className="text-blue-500 underline">Log in</a>.
            </p>
          </div>
        </form >
      </div>
    </main>
  )
}

export default Form;
