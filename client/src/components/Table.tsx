import { FC } from "react";
import { TableData, TableHeads } from "./ui/table.tsx"

interface TableProps {
  id: string;
  name: string;
  createdAt: string;
  status: string;
}

const tableHeaders = [
  { title: "name" },
  { title: "Container Id" },
  { title: "Time" },
  { title: "status" },
  { title: "Actions" }
]

const Table: FC<{ items: TableProps[] }> = ({ items }) => {

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-800">
          {
            tableHeaders.map((item, idx) => (
              <TableHeads title={item.title} key={idx} />
            ))
          }
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-800">
        {items.map((item, idx) => (
          <TableData item={item} key={idx} />
        ))}
      </tbody>
    </table>
  )
}

export default Table;
