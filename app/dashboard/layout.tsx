import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex w-screen h-screen ">
      <div className="  ">
        <Sidebar />
      </div>

      <div className=" h-full w-full">{children}</div>
    </div>
  );
}
