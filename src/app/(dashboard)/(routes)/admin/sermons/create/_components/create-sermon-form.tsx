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
  title: z.string().min(2).max(50),
  preacher: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  dateDelivered: z.date(),
  description: z.string().min(2).max(50),
  imageUrl: z.string().min(2).max(50),
  isPublished: z.boolean(),
  
})

const ministers = [
    {
        name: 'Brown Adejoh',
        title: 'Rev'
    },
    {
        name: 'Daniel Moses',
        title: 'Pst'
    },
    {
        name: 'Sule Abdulahi',
        title: 'Apo'
    },
    {
        name: 'Matias Jimoh',
        title: 'Tea'
    },
    {
        name: 'Murtala Mohammed',
        title: 'Pro'
    },
]
const CreateSermonForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          category: "", 
          description: "",
          imageUrl: "",
          isPublished: false,
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
                            name="title"
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Sermon Title:</FormLabel>
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
                            name="preacher"
                            render = {({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Sermon Preacher:</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant='outline'
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? ministers.find(
                                                                (minister) => minister.title === field.value
                                                                )?.name
                                                                : "Select minister"
                                                        }
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />

                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search minister..."
                                                        className="h-9"
                                                    />
                                                    <CommandEmpty>No minister found.</CommandEmpty>

                                                    <CommandGroup>
                                                        {ministers.map((minister) => (
                                                            <CommandItem
                                                                value={minister.name}
                                                                key={minister.title}
                                                                onSelect={() => {
                                                                form.setValue("preacher", minister.title)
                                                        }}
                                                    >
                                                        {minister.name}
                                                        <CheckIcon
                                                            className={cn(
                                                            "ml-auto h-4 w-4",
                                                            minister.name === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                        )}
                                                    />
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 items-center">
                        <FormField 
                            control={form.control}
                            name="category"
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Sermon Category:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="who delievered this sermon?"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="dateDelivered"
                            render = {({field}) => (
                                <FormItem className="flex flex-col">
                                    
                                    <FormLabel>Sermon Date:</FormLabel>
                                    
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('w-full pl-3 text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                        )}
                                                         <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />

                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField 
                        control={form.control}
                        name="description"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="what is the message about?"
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
                                <FormLabel>Sermon Image:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="who delievered this sermon?"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="isPublished"
                        render = {({field}) => (
                            <FormItem>
                                <FormControl>
                                    <div >
                                        <div className="flex items-center">
                                            <label htmlFor="isPublished" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Publish this sermon</label>
                                                <Checkbox
                                                    onCheckedChange={field.onChange}
                                                    checked={field.value}
                                                    id="isPublished" className="mr-2 h-5 w-5" 
                                                />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">*Click on the checkbox if you wish to publish this sermon.</p>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type = 'submit'
                    >
                        Create Sermon
                    </Button>
                </form>
            </Form>
        </div>
     );
}
 
export default CreateSermonForm;