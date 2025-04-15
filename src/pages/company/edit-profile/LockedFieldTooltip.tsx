
import { Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LockedFieldTooltipProps } from "./types";

const LockedFieldTooltip = ({ children, message }: LockedFieldTooltipProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          {children}
          <Lock className="ml-2 h-4 w-4 text-slate-400" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs">{message}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default LockedFieldTooltip;

