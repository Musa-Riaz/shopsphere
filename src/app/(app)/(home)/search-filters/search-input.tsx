import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps { 
    disables?:  boolean;

}

export default function SearchInput({disables} : SearchInputProps) {
    return (
        <div className="flex flex-col w-full gap-2">
            <div className="relative w-full ">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <Input className="pl-8 " placeholder="Search Products" />
            </div>
        </div>
    )
}