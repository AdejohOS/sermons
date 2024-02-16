

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CreateLocationForm from "./_components/create-location-form";
  
const  CreateSermon = () => {
    return ( 
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Add a Center</h2>
            <p>Fill out the form below to add a koinonia center</p>

            <div className="mt-4">
                <Card>
                    <div className="p-4">
                        <CreateLocationForm />
                    </div>
                </Card>
                

            </div>
        </div>
     );
}
 
export default CreateSermon;