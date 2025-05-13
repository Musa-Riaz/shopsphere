"use client"
import { RefObject } from "react"
export default function useDropdownPosition(
ref: RefObject<HTMLDivElement | null > | RefObject<HTMLDivElement>
){
const getDropDownPosition = () => {
        if(!ref.current) return {top :0, left: 0}
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 200; //width of dropdown 

    //calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;
//check if the dropdown is going out of the screen
    if(left + dropdownWidth > window.innerWidth){
        //if it is, set the left position to the right of the button
        left = rect.right + window.scrollX - dropdownWidth;

        //if still going out of the screen, set it to the left of the button
        if(left < 0){
            left = window.innerWidth - dropdownWidth - 16;
        }

        //ensure dropdown is not going out of the screen
        if(left < 0){
            left = 16;
        }
        return {top, left}
    }
}

    return {getDropDownPosition}

}