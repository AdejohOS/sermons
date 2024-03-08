'use client'

import { DataTable } from "@/components/ui/data-table"
import { AuthorColumn, columns } from "./columns"

interface EventClientProps {
    data: AuthorColumn[]
}
export const AuthorClient = ({data}:EventClientProps) => {
    return (
        <>
            <DataTable columns={columns} data={data} searchKey="name"/>
        </>
    )
}