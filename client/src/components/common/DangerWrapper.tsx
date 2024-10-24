import { cn } from "@/lib/utils"
import React from "react"

const DangerWrapper = ({children, className = ''}: {children: React.ReactNode, className?: string}) => {
    return (
        <span className={cn(className, 'text-danger-red text-xs')}>
            {children}
        </span>
    );
}

export default DangerWrapper;
