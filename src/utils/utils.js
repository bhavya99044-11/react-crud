import { twMerge } from "tailwind-merge";
import { clsx } from 'clsx';

export const capitalInput=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function cn(...inputs){
    return twMerge(clsx(inputs))
}

