import { FC } from "react";
import { Button } from "./button";


export const TableHeads: FC<{ title: string }> = ({ title }) => {

  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
      {title}
    </th>
  )
}

interface TableDateProps {
  item: {
    id: string;
    name: string;
    time: string;
    status: string;
  }
}

export const TableData: FC<TableDateProps> = ({ item }) => {

  return (
    <>
      <tr key={item.id}>
        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
        <td className="px-6 text-blue-500 underline py-4 whitespace-nowrap">{item.id}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Running' ? 'bg-green-800 text-green-100' :
            item.status === 'Stopped' ? 'bg-red-800 text-red-100' :
              'bg-yellow-800 text-yellow-100'
            }`}>
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Button variant="outline" size="sm" className="text-blue-400 hover:text-blue-300">
            Manage
          </Button>
        </td>
      </tr>
    </>

  )
}
