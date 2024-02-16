"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from 'date-fns'
import { CalendarIcon, CheckIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"


const formSchema = z.object({
  name: z.string().min(2).max(50),
  aboutAuthor: z.string().max(50),
  imageUrl: z.string(),
  
})


const CreateLocationForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          aboutAuthor: "", 
          imageUrl: "",
         
        },
      })

      const onSubmit = (values: z.infer<typeof formSchema> ) => {
        console.log(values)
      }
    return ( 
        <div>
            <Form {...form}>
                <form action="" className="space-y-8">
                    
                <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 items-center">
                        <FormField 
                            control={form.control}
                            name="name"
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Center Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter sermon title"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                   
                    <FormField 
                        control={form.control}
                        name="imageUrl"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Author Image:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="who delievered this sermon?"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    </div>
                    

                    

                    <Button
                        type = 'submit'
                    >
                        Create Author
                    </Button>
                </form>
            </Form>
        </div>
     );
}
 
export default CreateLocationForm;