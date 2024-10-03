import { FC } from "react";
import { Intro, Navbar, Working } from "@/components";

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto md:px-24 py-12">
        <Intro />
        <Working />
      </main>
    </div>
  )
}

export default Home;
