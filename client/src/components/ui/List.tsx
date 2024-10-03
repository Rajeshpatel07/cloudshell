import { FC } from "react"
import { Home } from "lucide-react"
import { Link } from "react-router-dom"

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


export const ListLinks: FC<{ title: string }> = ({ title }) => {


  return (
    <>
      <li>
        <Link to="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
          {title}
        </Link>
      </li>
    </>

  )
}

