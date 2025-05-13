import { Category } from "@/payload-types";
import Link from "next/link";

interface SubcategoryMenuProps {
  category: Category;
  isOpen: boolean;
  position: { top: number; left: number };
}

export default function SubcategoryMenu({
  category,
  isOpen,
  position,
}: SubcategoryMenuProps) {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0)
    return null;
  const backgorundColor = category.color || "#f5f5f5";
  return (
    <div
      className="fixed z-100"
      style={{
        top: position?.top,
        left: position?.left,
      }}
    >
      <div className="h-3 w-60" />
      <div
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_4px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
        style={{
          backgroundColor: backgorundColor || "#f5f5f5",
        }}
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center  font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
