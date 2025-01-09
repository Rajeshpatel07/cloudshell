import { FC } from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";


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
    createdAt: string;
    status: string;
  }
}
;

function convertISOToCustomFormat(isoDateString: string) {
  // Parse the ISO date string
  const date = new Date(isoDateString);

  // Format the date components
  const day = String(date.getUTCDate()).padStart(2, '0'); // Get day in UTC
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month in UTC (0-based)
  const year = date.getUTCFullYear(); // Get year in UTC

  // Format the time components (in UTC)
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Construct the final formatted string
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const TableData: FC<TableDateProps> = ({ item }) => {

  return (
    <>
      <tr key={item.name}>
        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
        <td className="px-6 text-blue-500 underline py-4 whitespace-nowrap">{item.id.slice(0, 15)}..</td>
        <td className="px-6 py-4 whitespace-nowrap">{convertISOToCustomFormat(item.createdAt)}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'running' ? 'bg-green-800 text-green-100' :
            item.status === 'stopped' ? 'bg-red-800 text-red-100' :
              'bg-yellow-800 text-yellow-100'
            }`}>
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Link to={`/manage/${item.id}`}>
            <Button variant="outline" size="sm" className="text-blue-400 hover:text-blue-300">
              Manage
            </Button>
          </Link>
        </td>
      </tr>
    </>

  )
}
