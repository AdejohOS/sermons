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



<h2 className="text-2xl font-semibold">Add a sermon</h2>
            <p>Fill out the form below to add a sermon</p>

            <div className="mt-4">
                <Card>
                    <div className="p-4">
                        <CreateSermonForm />
                    </div>
                </Card>
                

            </div>


<div className="flex items-center gap-4">

<ModeToggle/>

{userId ? (

    <div className="flex items-center gap-4">
        <Button type="button" variant='outline' className="rounded-full p-3 border">
            <Bell className="h-4 w-4 shrink-0"/>
        </Button>

        <div className="flex ml-auto">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
    
): (
    <Link
        href='/sign-in'
    >
        <Button className="flex items-center" variant='outline'>
            <LogIn className="w-4 h-4 mr-2 shrink-0" />
            Login
        </Button>
    </Link>
)}







</div>

<div>

</div>