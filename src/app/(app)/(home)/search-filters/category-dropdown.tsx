"use client"
import { useState, useRef} from 'react'
import { Button } from '@/components/ui/button';
import {cn} from "@/lib/utils";
import useDropdownPosition from './use-dropdown-position';
import SubcategoryMenu from './subcategory-menu';
import Link from 'next/link';
import { CustomCateogory } from '../types';
interface CategoryDropDownProps {
  category: CustomCateogory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

const CategoryDropDown = ({category, isActive, isNavigationHovered } : CategoryDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownref = useRef<HTMLDivElement>(null);


  const { getDropDownPosition } = useDropdownPosition(dropdownref);
  const onMouseEnter = () => {
    if(category.subcategories){
      setIsOpen(true);
    }
  }

  const onMouseLeave = () => setIsOpen(false);
  const dropdownposition = getDropDownPosition();
  return (
    <div className='relative' ref={dropdownref}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
      <div className='relative'>
      <Button variant="elevated"
      className= {cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black", isActive && !isNavigationHovered && "bg-white border-primary" , isOpen && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] f-translate-x-[4px] f-translate-y-[4px] ") }
      >
        <Link href={`/${category.slug === 'all' ? "" : category.slug}`} >
          {category.name}
          </Link>
      </Button>
      {category.subcategories && category.subcategories.length > 0 && (
        <div className={cn("opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2", isOpen && "opacity-100")}>

        </div>
      )}
      </div>
      <SubcategoryMenu 
      category={category}
      isOpen={isOpen}
      position={dropdownposition}
      />
    </div>
  )
}

export default CategoryDropDown
