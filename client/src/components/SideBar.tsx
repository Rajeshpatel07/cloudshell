import { FC } from "react";
import { ListLinks } from "./ui/List";

const SidebarItems = [
  { title: "Containers List" },
  { title: "Manage Access" },
  { title: "settings" },
]

const SideBar: FC = () => {

  return (
    <aside className="w-72 p-6 bg-slate-950 hidden md:block">
      <nav>
        <ul className="space-y-2">
          {
            SidebarItems.map((item, idx) => (
              <ListLinks title={item.title} key={idx} />
            ))
          }
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar;
