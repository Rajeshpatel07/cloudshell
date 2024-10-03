import { FC } from "react"
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Intro: FC = () => {

  return (
    <>
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Virtual OS at Your Fingertips
        </h1>
        <p className="text-xl mb-8 text-gray-400">
          Create and interact with virtual operating systems through a powerful online terminal.
        </p>
        <Link to="login">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
            Get Started
          </Button>
        </Link>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Powerful Virtual Environments</h2>
          <p className="text-gray-400 mb-6">
            Launch fully-functional virtual operating systems in seconds. Experiment, develop, and learn without risking your local machine.
          </p>
          <ul className="space-y-2">
            {["Multiple OS options", "Persistent storage", "Customizable configurations"].map((feature, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-5 w-5 text-blue-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <img
            src="https://cdn.prod.website-files.com/64b6f3636f598299028e8577/65d5db665ae2b6b691e54ac6_modern-editing%402x.webp"
            alt="Virtual OS Interface"
            className="w-full h-auto rounded"
          />
        </div>
      </section>
    </>



  )
}

export default Intro;
