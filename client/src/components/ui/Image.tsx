import { FC } from "react"


export const Logo: FC = () => {

  return (
    <div className="flex items-center gap-3">
      <img
        src="logo.png"
        className="h-11 w-11"
        alt=" logo"
      />
      <h1 className="text-2xl font-bold text-white">CloudShell</h1>
    </div>
  )
}

export const Image: FC<{ link: string }> = ({ link }) => {

  return (
    <img src={link} alt={"l"} className="w-full h-full bg-center" />
  )
}
