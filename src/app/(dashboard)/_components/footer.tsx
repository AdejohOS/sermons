import Logo from "@/components/logo";
import { Facebook, Twitter, Youtube } from "lucide-react";

import Link from "next/link";

const Footer = () => {
    return ( 
        <footer className="flex flex-col gap-2 p-4 w-full bg-slate-300/20 border-t shadow-md">
            <div className="grid grid-cols-3 w-full justify-between">
                <div>
                    <Logo />
  
                </div>
                <div>
                    <h2>Contact Us</h2>
                </div>
                <div>
                        <h2>Social Media</h2>
                        <div className="flex gap-3 items-center text-slate-500">
                            <Link
                                href='https://www.youtube.com/Koinonia%20Global'
                                target="_blank"
                            >
                                <Youtube size={22}/>
                            
                            </Link>

                            <Link
                                href='/'
                                target="_blank"
                            >
                             <Facebook size={22}/>

                            </Link>
                            <Link
                                href='/'
                                target="_blank"
                            >
                             <Twitter size={22}/>

                            </Link>

                        </div>
                        

                        
                    </div>

            </div>
            <p className="text-slate-500 text-center text-xs">&#169; Koinonia Network International 2024</p>
        </footer>
     );
}
 
export default Footer;