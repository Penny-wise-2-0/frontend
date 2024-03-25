import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div>{children}</div>
    </div>
  );
}
