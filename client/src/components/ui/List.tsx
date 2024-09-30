import { FC } from "react"

export const SimpleList: FC<{ items: Array<{ title: string }> }> = ({ items }) => {
  return (
    <>
      {
        items.map((item, idx) => (
          <li key={idx} className="text-black dark:text-gray-100 ">
            <a href={item.title}>
              {item.title}
            </a>
          </li>
        ))
      }
    </>
  )
}


