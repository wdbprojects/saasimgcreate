"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { X } from "lucide-react";

const MobileSidebarClose = () => {
  const { setOpenMobile, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <div className="absolute top-1 -right-2 z-50 mb-4 px-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setOpenMobile(false);
        }}
        className="size-8 cursor-pointer p-0"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
};

export default MobileSidebarClose;
