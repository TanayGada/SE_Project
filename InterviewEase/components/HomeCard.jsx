import { cn } from "@/lib/utils";
import React from "react";

const HomeCard = ({className, title, description, handleClick}) => {
  return (
    <div
      className={cn("px-4 py-6 flex flex-col justify-between w-full xl:max-w-[350px] min-h-[300px] rounded-[14px] cursor-pointer",className)}
      onClick={() => handleClick()}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        img
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
