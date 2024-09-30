import { FC } from "react";
import { FormInput } from "./ui/Input";
import { SimpleButton } from "./ui/Buttons";
import { fields } from "../data/Form";


const Login: FC = () => {

  return (
    <section className="md:h-full  flex  justify-center items-center">
      <div className="lg:grid md:w-8/12 lg:grid-cols-12">
        <section
          className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img alt="img" src="logo.png"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <Text />
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Text />
            </div>
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <FormInput fields={fields} />
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <SimpleButton title="Create an account" />
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="#" className="text-blue-500 underline">Log in</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Login

const Text = () => {
  return (
    <>
      <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        Welcome to Cloud Shell
      </h1>
      <p className="mt-4 leading-relaxed text-gray-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
        quibusdam aperiam voluptatum.
      </p>
    </>
  )
}
