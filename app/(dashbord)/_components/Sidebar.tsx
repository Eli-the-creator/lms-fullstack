import Logo from './Logo';
import SideBarRoutes from './SideBarRoutes';

function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-slate-50 shadow-sm">
      <div className="flex justify-center p-6">
        <Logo />
      </div>
      <div className="flex flex-col">
        <SideBarRoutes />
      </div>
    </div>
  );
}

export default Sidebar;
