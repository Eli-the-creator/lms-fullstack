import NavbarRoutes from '@/components/NavbarRoutes';
import MobileSideBar from './MobileSideBar';

function NavBar() {
  return (
    <div className="p-4 border-b h-full flex items-center bg-slate-50">
      <MobileSideBar />
      <NavbarRoutes />
    </div>
  );
}

export default NavBar;
