import { PlusCircle } from "lucide-react";
import Link from "next/link";

const AuthorPage = () => {
    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Authors</h2>
                <Link
                href='/admin/author/create'
                >
                <button 
                    className="flex items-center border p-2 rounded-md text-green-700 hover:bg-green-200">
                    <PlusCircle className="w-4 h-4 shrink-0 mr-2 "/>Add an Author
                </button>
                </Link>
                
            </div>
            
           this goes in here
        </div>
     );
}
 
export default AuthorPage;