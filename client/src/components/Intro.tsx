import { FC } from "react"
import { Image } from "./ui/Image";
import { SimpleButton } from "./ui/Buttons";

const Intro: FC = () => {

  return (
    <section className=" text-gray-100 dark:text-gray-800 py-12">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-around">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-lg xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-none dark:text-white sm:text-6xl">Run your Favorite OS in Cloud
          </h1>
          <p className="mt-6 mb-8 text-lg dark:text-white sm:mb-12">use your favorite operating system
            <br className="hidden md:inline lg:hidden" /> without installing locally
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a href="#">
              <SimpleButton title="Get started" />
            </a>
            <a href="#">
              <SimpleButton title="Try Demo" />
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 md:h-[30rem] lg:h-96 xl:h-[27rem] 2xl:h-[30rem]">
          <Image link="server.png" />
        </div>
      </div>
    </section>
  )
}

export default Intro;
