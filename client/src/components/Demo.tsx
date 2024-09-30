import { FC } from "react"

const Demo: FC = () => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl text-gray-800 dark:text-white font-extrabold mx-auto md:text-5xl">
            Learn how Command Line work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]"> with Linux terminal in Cloud</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white">
            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          </p>
        </div>
        <div className="mt-14">
          <img src="terminal.gif" className="w-full shadow-lg rounded-lg border" alt="" />
        </div>
      </div>
    </section>
  )
}

export default Demo;
