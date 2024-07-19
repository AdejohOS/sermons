import { getFavouriteSermons } from "@/data/getFavouriteSermons";
import { ListMusic } from "lucide-react";
import React from "react";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { RelatedSermon } from "@/lib/types";

interface LibraryProps {
  favouriteSermons: RelatedSermon[];
}

const Library = ({ favouriteSermons }: LibraryProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-3 px-5 pt-4 ">
          <div className="inline-flex items-center gap-x-2">
            <ListMusic size={26} className="text-neutral-400" />
            <p
              className="text-neutral-400
          text-md font-medium"
            >
              Your Library
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of Sermons</div>
      <div>
        {favouriteSermons.map((favourite) => (
          <div key={favourite.id}></div>
        ))}
      </div>
    </>
  );
};

export default Library;
