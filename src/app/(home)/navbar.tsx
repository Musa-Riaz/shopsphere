"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavbarSidebar from "./navbar-sidebar"
import { useState } from "react"
import { MenuIcon } from "lucide-react"
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['700']
})

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const navbaritems = [
    {href: '/', children: 'Home'},
    {href: '/about', children: 'About'},
    {href: '/Pricing', children: 'Pricing'},
    {href: '/contact', children: 'Contact'},
    {href: '/features', children: 'Features'},

]

const NavbarItem = ({href ,children, isActive} : NavbarItemProps) => {
    return (
        <Button variant={"outline"} className={cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
            isActive && "bg-black text-white hover:bg-black hover:text-white"
        )}>
            <Link href={href}>
            {children}
            </Link>
        </Button>
    )
}

export default function Navbar(){
    const pathname = usePathname()
    const [isSidebaropen, setIsSidebarOpen] = useState(false)
    return (
        <nav className="h-20 flex border-b justify-between  items-center font-medium bg-white ">
            <div className="flex items-center">
                <Link href="/">
                <h1 className={cn("text-5xl font-bold text-gray-800" , poppins.className)}>ShopSphere</h1>
                </Link>                
            </div>
            {isSidebaropen && (
                <NavbarSidebar items={navbaritems} open={isSidebaropen} onOpenChange={setIsSidebarOpen} />
            )}
            <div className="items-center space-x-4 hidden lg:flex">
                {navbaritems.map((item) => (
                    <NavbarItem key={item.href} href={item.href} isActive={pathname === item.href} >
                        {item.children}
                    </NavbarItem>
                ))}
            </div>
            <div className="hidden lg:flex h-full items-center ">
                <Button variant="secondary" className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none bg-white hover:bg-pink-400 transition-colors text-lg h-full">
                    <Link href="/sign-in">Login</Link>
                    
                </Button>
                <Button variant="secondary" className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg h-full">
                    <Link href="/sign-up">Start Selling</Link>
                </Button>
            </div>

            <div className="flex lg:hidden justify-center items-center">
                <Button variant={"ghost"}
                className="size-12 border-transparent bg-white"
                onClick={() => setIsSidebarOpen(true)}
                >
                    <MenuIcon />
                </Button>
                
            </div>
            
        </nav>
    )
}