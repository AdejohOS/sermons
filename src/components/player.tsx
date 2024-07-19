"use client";

import usePlayer from "@/hooks/use-player";
import PlayerContent from "./player-content";

import useGetSermonById from "@/hooks/use-get-sermon-by-id";

const Player = () => {
  return (
    <div className="fixed bottom-0 w-full bg-slate-900 py-2 h-[80px] z-40 px-4">
      <PlayerContent />
    </div>
  );
};

export default Player;
