"use client";
import CategoryDropDown from "./category-dropdown";
import { useRef, useState, useEffect } from "react";
import { CustomCateogory } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import CategoriesSidebar from "./categories-sidebar";

interface CategoryProps {
  data: CustomCateogory[];
}

export default function Categories({ data }: CategoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeCateogory = "All";
  const activeCategoryIndex = data.findIndex(
    (cat) => cat.name === activeCateogory
  );
  const isActiveCategory =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;
      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;
      for (const item of items) {
        const width = item.getBoundingClientRect().width;
        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible);
    };

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);
  return (
    <div className="relative w-full ">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange = {setIsSidebarOpen} data={data} />
      <div 
      ref={measureRef}
      className="absoulte opacity-0 pointer-events-none flex"
      style={{position: "fixed", top: -9999, left: -9999}}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropDown
              category={category}
              isActive={activeCateogory === category.name}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      <div 
      ref={containerRef}
      className="flex flex-nowrap items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropDown
              category={category}
              isActive={activeCateogory === category.name}
              isNavigationHovered={isHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button className= {cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black", isActiveCategory && !isHovered && "bg-white border-primary")}
          onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon  />
          </Button>
        </div>
      </div>
    </div>
  );
}
