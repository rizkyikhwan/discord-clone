import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
  src?: string
  className?: string
  onlineIndicator?: boolean
}

const UserAvatar = ({ src, className, onlineIndicator }: UserAvatarProps) => {
  return (
    <div className="relative">
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
        <AvatarImage src={src} />
      </Avatar>
      {onlineIndicator && (
        <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-emerald-500" />
      )}
    </div>
  )
}
export default UserAvatar