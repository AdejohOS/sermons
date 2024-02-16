import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode
}
const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return ( 
        <main className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar/>
            </div>
            <div className="hidden md:flex flex-col fixed h-full inset-y-0 w-56 z-50">
                <Sidebar/>
            </div>
            
            
            <div className="md:pl-56 h-full pt-[80px] overflow-y-auto">
                {children}
            </div>

            
        </main>
     );
}
 
export default DashboardLayout;