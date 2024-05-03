import Headings from "@/components/headings";
import Logo from "@/components/logo";
import UserAction from "@/components/user-action";
import MobileSidebar from "./mobile-nav";

const Navbar = () => {
  return (
    <div className="p-4 h-full border-b flex items-center justify-between bg-background shadow-sm">
      <MobileSidebar />
      <div className="flex items-center gap-4">
        <div className="flex md:hidden shrink-0">
          <Logo />
        </div>
        <Headings title="Dashboard" />
      </div>

      <UserAction />
    </div>
  );
};

export default Navbar;
