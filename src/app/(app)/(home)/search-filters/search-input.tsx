"use client"
import { Input } from "@/components/ui/input";
import { ListFilter, SearchIcon } from "lucide-react";
import { CustomCateogory } from "../types";
import CategoriesSidebar from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
interface SearchInputProps { 
    disables?:  boolean;
    data: CustomCateogory[];

}

export default function SearchInput({data} : SearchInputProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <div className="flex  w-full gap-2">
            <div className="relative w-full ">
                <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <Input className="pl-8 " placeholder="Search Products" />
            </div>
            <Button variant={"elevated"}
            className="size-12 shrink-0 flex lg:hidden"
            onClick={() => setIsSidebarOpen(true) }
            >
                <ListFilter  />
            </Button>
        </div>
    )
}