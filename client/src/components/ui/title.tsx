import { FC, memo } from "react";

interface config {
  id: string;
  name: string;
  status: string;
  image: string;
  createdAt: string;
}

export const Title: FC<{ config: config }> = memo(({ config }) => {

  return (
    <>
      <p className="text-blue-500 ">
        <span className="font-medium no-underline text-white">Id: </span>
        {config.id}
      </p>
      <p><span className="font-medium">Name:</span> {config.name}</p>
      <p><span className="font-medium">Status:</span>
        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.status === 'running' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
          }`}>
          {config.status}
        </span>
      </p>
      <p><span className="font-medium">Image:</span> {config.image}</p>
      <p><span className="font-medium">Launch Time:</span> {config.createdAt}</p>
    </>
  )
})

