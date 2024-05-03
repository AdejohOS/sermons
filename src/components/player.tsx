"use client";

import usePlayer from "@/hooks/use-player";
import PlayerContent from "./player-content";

import useGetSermonById from "@/hooks/use-get-sermon-by-id";

const Player = () => {
  const player = usePlayer();
  const { sermon } = useGetSermonById(player.activeId);

  if (!sermon || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full bg-black py-2 h-[80px] z-40 px-4">
      <PlayerContent sermon={sermon!} />
    </div>
  );
};

export default Player;
