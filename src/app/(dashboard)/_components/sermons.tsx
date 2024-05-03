"use client";
import { PlayButton } from "@/components/play-button";
import { Badge } from "@/components/ui/badge";

import { Calendar, CalendarDays, Loader2, MicIcon } from "lucide-react";
import Image from "next/image";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SermonItem from "./sermonItem";

import NoResults from "@/components/no-results";
import { Author, Category, Sermon, Location } from "@prisma/client";
import useOnPlay from "@/hooks/use-on-play";
import { useEffect, useState } from "react";

export type ExtendedSermon = Sermon & {
  author: Author;
  category: Category;
  location: Location;
};

export const Sermons = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mySermons"],
    queryFn: async () => {
      const { data } = await axios.get("/api/sermon");
      console.log(data);
      return data.array as ExtendedSermon[];
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        Loading sermons... <Loader2 className="animate-spin h-4 w-4" />
      </div>
    );
  if (isError) return <div> Error loading sermons, check connection!</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {data?.length === 0 && <NoResults />}
      {data?.map((sermon) => (
        <SermonItem
          onClick={(id: string) => {}}
          key={sermon.id}
          data={sermon}
        />
      ))}
    </div>
  );
};
