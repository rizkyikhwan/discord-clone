import { ActiveUsersProps } from "@/type"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkUserIsOnline(onlineUser: ActiveUsersProps[], id: string) {
  const online = onlineUser.find((user) => user.userId === id)
    
  return online ? true : false
}
