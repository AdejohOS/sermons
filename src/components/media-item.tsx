"use client";

import Image from "next/image";

import { Sermon } from "@prisma/client";
import usePlayer from "@/hooks/use-player";

interface MediaItemProps {
  onClick?: (id: string) => void;
}

const MediaItem = ({ onClick }: MediaItemProps) => {
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick("");
    }

    return player.setId("");
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >
      <div
        className="
          relative 
          rounded-full 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={"/images/audioPlace.png"}
          alt="MediaItem"
          className="object-fit animate-pulse"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">Hello</p>
        <p className="text-neutral-400 text-sm truncate">By Sunday Adejoh</p>
      </div>
    </div>
  );
};

export default MediaItem;
