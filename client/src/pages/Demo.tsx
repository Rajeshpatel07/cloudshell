import { FC, useState } from "react";
import { FormInput } from "../components/ui/Input";
import { config } from "../data/Form";
import { LogoCards } from "../components/ui/Cards";
import { os } from "../data/OsImages";
import { ActionButton } from "../components/ui/Buttons";


const Demo: FC = () => {

  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    if (name.trim().length > 0 && selectImage !== null) {
      console.log(name, selectImage)
    }
  }

  return (
    <section className=" px-3 2xl:px-52 py-8">
      <div className=" lg:px-14 2xl:px-20 py-10 flex flex-col justify-center">
        <section className="dark:text-white gap-2">
          <h1 className="font-bold text-3xl">Configure your OS</h1>
        </section>

        <main className="mt-5 p-2 dark:text-white flex flex-col gap-8">
          <div className="flex flex-col gap-6 2xl:w-[50vw]">
            <FormInput field={config} setState={setName} />
          </div>
          <div className="">
            <h1 className="font-bold text-3xl">Select any Operating system</h1>
            <section className="flex flex-wrap justify-center gap-5 mt-5">
              <LogoCards
                os={os}
                selectImage={selectImage}
                setSelectImage={setSelectImage}
              />
            </section>

            <div className="py-10 px-5">
              <ActionButton title="Create" handleSubmit={handleSubmit} />
            </div>
          </div>
        </main>

      </div>
    </section>
  )
}

export default Demo;
