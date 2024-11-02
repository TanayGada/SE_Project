import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-blue-700 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
            <div className="flex justify-center">
            img
            </div>
            <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>    
            {children}
            <Button className="bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}
            >
                {buttonText || "Create Meeting"}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
