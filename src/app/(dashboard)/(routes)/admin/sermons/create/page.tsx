import CreateSermonForm from "./_components/create-sermon-form";
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
            <h2 className="text-2xl font-semibold">Add a sermon</h2>
            <p>Fill out the form below to add a sermon</p>

            <div className="mt-4">
                <Card>
                    <div className="p-4">
                        <CreateSermonForm />
                    </div>
                </Card>
                

            </div>
        </div>
     );
}
 
export default CreateSermon;