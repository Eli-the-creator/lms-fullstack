import { ReactNode } from 'react';
import Sidebar from './_components/Sidebar';
import NavBar from './_components/NavBar';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed insert-y-0 w-full z-50">
        <NavBar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 shadow-xl">
        <Sidebar />
      </div>
      <main className="h-full md:pl-56 pt-[80px]">{children}</main>
    </div>
  );
}

export default DashboardLayout;
