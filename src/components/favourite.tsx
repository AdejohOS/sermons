"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Loader2 } from "lucide-react";
import { useOptimistic, useState } from "react";
import { useCurrentUserId } from "@/hooks/use-current-user";
import { switchFavourite } from "@/actions/actions";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  sermonId: string;
  favourites?: string[];
}

const FavoriteButton = ({ sermonId, favourites }: FavoriteButtonProps) => {
  const userId = useCurrentUserId();
  const router = useRouter();
  const [favouriteState, setFavouriteState] = useState({
    favouriteCount: favourites?.length,
    isFavourite: userId ? favourites?.includes(userId) : false,
  });

  const [optimisticFavourite, switchOptimisticFavourite] = useOptimistic(
    favouriteState,
    (state, value) => {
      return {
        favouriteCount: state.isFavourite
          ? state.favouriteCount! - 1
          : state.favouriteCount! + 1,
        isFavourite: !state.isFavourite,
      };
    }
  );

  const favouriteAction = async () => {
    if (!userId) {
      router.push("/auth/login");
    }
    switchOptimisticFavourite("");
    try {
      switchFavourite(sermonId);
      setFavouriteState((state) => ({
        favouriteCount: state.isFavourite
          ? state.favouriteCount! - 1
          : state.favouriteCount! + 1,
        isFavourite: !state.isFavourite,
      }));
    } catch (error) {}
  };

  return (
    <>
      <form action={favouriteAction}>
        {optimisticFavourite.isFavourite ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:opacity-75 transition  "
                >
                  <AiFillHeart className="text-red-500 w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Click to remove from favorites!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:opacity-75 transition"
                >
                  <AiOutlineHeart className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Click to add to favorites!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </form>
      <p className="text-foreground">
        {optimisticFavourite.favouriteCount}{" "}
        {optimisticFavourite.favouriteCount! === 1 ? "Favourite" : "Favourites"}
      </p>
    </>
  );
};

export default FavoriteButton;
