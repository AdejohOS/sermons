import CreateAuthorForm from "./_components/create-author-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
const  CreateSermon = () => {
    return ( 
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Add an Author</h2>
            <p>Fill out the form below to add an author</p>

            <div className="mt-4">
                <Card>
                    <div className="p-4">
                        <CreateAuthorForm />
                    </div>
                </Card>
                

            </div>
        </div>
     );
}
 
export default CreateSermon;