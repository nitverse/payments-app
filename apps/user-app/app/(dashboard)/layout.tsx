import React from "react";
import { FC } from "react";
import SidebarItem from "../../components/SidebarItem"
import {House , ArrowLeftRight , Send} from "lucide-react"
interface layoutProps {
    children: React.ReactNode;
}

const layout: FC<layoutProps> = ({children}) => {
    return (
      <div className="flex">
        <div>
          <div>
            <SidebarItem href={"/dashboard"} icon={<House />} title="Home" />
            <SidebarItem href={"/transfer"} icon={<Send />} title="Transfer" />
            <SidebarItem
              href={"/transactions"}
              icon={<ArrowLeftRight />}
              title="Transactions"
            />
          </div>
            </div>
            {children}
      </div>
    );
};

export default layout;
