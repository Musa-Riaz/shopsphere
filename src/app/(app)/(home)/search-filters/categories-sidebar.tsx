
import React from 'react'
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { CustomCateogory } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface CategoriesSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCateogory
}

const CategoriesSidebar = ({open, onOpenChange, data} : CategoriesSidebarProps) => {
    const router = useRouter();
    const [parentCategory, setParentCategory] = useState<CustomCateogory | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<CustomCateogory | null>(null);

    //if we have parent categories, show those. otherwise show root categories

    const currentCategories = parentCategory?.subcategories ?? data   ;
    const handleOpenChange = (open: boolean) => {
        console.log(currentCategories ,"category clicked" );
        setSelectedCategories(null);
        setParentCategory(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: CustomCateogory) => {
        
        if(category.subcategories && category.subcategories.length > 0){
            console.log(category, " category clicked" );
            setParentCategory(category as CustomCateogory) ;
            console.log(currentCategories, " current categories" );
            setSelectedCategories(category );
        }
        else{

            if(parentCategory && selectedCategories){
                router.push(`/${selectedCategories.slug}/${category.slug}`);
            }
            else{
                if(category.slug === 'all'){
                    router.push(`/`);
                }
                else{
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    }

    const handleBackClick = () => {
        if(parentCategory){
            setParentCategory(null);
            setSelectedCategories(null);
        }
    }

    const backgroundColor = selectedCategories?.color || "white";
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>   
        <SheetContent side='left' className='p-0 transition-none' style={{backgroundColor}}>
            <SheetHeader className='p-4 border-b'>
                <SheetTitle>Categories</SheetTitle>
            </SheetHeader>
            <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
                {parentCategory && (
                    <button className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
                    onClick={handleBackClick}>
                        <ChevronLeft className='size-4 mr-2' />
                        Back
                    </button>
                )}
              
              {currentCategories?.map((cat) => (
                
                <button key={cat.slug}
                className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium
                cursor-pointer'
                onClick={() => handleCategoryClick(cat)}
                >
                    {cat.name}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                       <ChevronRight className='size-4' />
                    )}
                </button>
              ))}
            </ScrollArea>
        </SheetContent>
    </Sheet>
  )
}

export default CategoriesSidebar
