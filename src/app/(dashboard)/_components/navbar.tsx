import Headings from "@/components/headings";
import Logo from "@/components/logo";
import UserAction from "@/components/user-action";
import { Heading } from "lucide-react";
import MobileSidebar from "./mobile-nav";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  


const Navbar = () => {
    return ( 
        <div className="p-4 h-full border-b flex items-center justify-between bg-background shadow-sm">
            <MobileSidebar/>
            <div className="flex items-center gap-4">
                
                <div className="flex md:hidden shrink-0">
                    <Logo/>
                </div>
                <Headings title="Dashboard"/>
            </div>
            
            <UserAction/>
            


        </div>
     );
}
 
export default Navbar;