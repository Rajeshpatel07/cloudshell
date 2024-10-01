import { FC } from "react"
import { Form } from "../components"

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
        <Form>
          <Text />
        </Form>

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
