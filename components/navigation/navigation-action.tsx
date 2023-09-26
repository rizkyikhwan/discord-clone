"use client"

import { Plus } from "lucide-react"
import ActionTooltip from "@/components/action-tooltip"
import { useModal } from "@/hooks/use-modal-store"

const NavigationAction = () => {
  const { onOpen } = useModal()

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button onClick={() => onOpen("createServer")} className="flex items-center group">
          <div className="flex items-center justify-center w-12 h-12 mx-3 overflow-hidden transition-all rounded-3xl group-hover:rounded-2xl bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus 
              className="transition group-hover:text-white text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
export default NavigationAction