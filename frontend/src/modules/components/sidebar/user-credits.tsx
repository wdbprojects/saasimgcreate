import { Coins, Sparkles } from "lucide-react";
import UpgradeButton from "@/modules/components/sidebar/upgrade-button";

const UserCredits = ({ credits }: { credits: number }) => {
  return (
    <div className="group flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <div className="relative">
          <Coins className="size-4 text-yellow-500 transition-colors duration-200 group-hover:text-yellow-400" />
          <Sparkles className="absolute -top-1 -right-1 size-2 text-yellow-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
        <div className="flex flex-col">
          <span className="text-foreground text-sm font-bold transition-colors duration-200 group-hover:text-yellow-600">
            {credits}
          </span>
          <span className="text-muted-foreground text-xs leading-tight">
            Credits
          </span>
        </div>
      </div>
      <UpgradeButton />
    </div>
  );
};

export default UserCredits;
