import { FC, memo } from "react";
import { Link } from "react-router-dom";

interface props {
  title: string;
  desc: string;
  link: string;
  buttonText: string;
}

export const DisplayError: FC<props> = memo(({ title, desc, link, buttonText }) => {

  return (
    <main className="grid h-screen place-items-center  px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-3xl font-semibold text-indigo-600 dark:text-indigo-800">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white  sm:text-5xl">{title}</h1>
        <p className="mt-6 text-white leading-7 ">{desc}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={link}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </main>

  )
})
