import {Category } from "@/payload-types"

export type CustomCateogory = Category & {
    subcategories: Category[]
}