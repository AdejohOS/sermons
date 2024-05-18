import Image from "next/image";
import { CalendarDays, Download, MicIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlayButton } from "@/components/play-button";

import { format } from "date-fns";
import { ExtendedSermon } from "./sermons";
import Link from "next/link";

interface SermonCard {
  data: ExtendedSermon;
  onClick: (id: string) => void;
}

const SermonItem = ({ data, onClick }: SermonCard) => {
  return (
    <div
      onClick={() => onClick(data.id)}
      className="border-b shadow-md bg-background rounded-md overflow-hidden"
    >
      <div className="relative group cursor-pointer transition">
        <div className="relative aspect-square ">
          <Image
            src={data?.imageUrl! || "/images/audioPlace.png"}
            alt="image"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="
          absolute 
          bottom-10
          right-5
        "
        >
          <PlayButton />
        </div>
      </div>

      <div className="my-4 p-1">
        <span className="flex gap-1 items-center text-muted-foreground">
          <CalendarDays className="h-3 w-3 shrink-0 " />
          <p className="text-xs">
            {format(data.dateDelivered, "MMMM do, yyyy")}
          </p>
        </span>
        <span className="flex gap-1 items-center text-muted-foreground">
          <MicIcon className="h-3 w-3 shrink-0" />
          <p className="text-xs"> {data.author.name}</p>
        </span>
        <Link
          className="font-medium truncate mt-2 "
          href={`/sermons/${data.id}`}
        >
          {data.title}
        </Link>
        <div className="flex items-center justify-between mt-2 text-muted-foreground">
          <a href={data.fileUrl} download="file.mp3">
            <Download className="h-4 w-4" />
          </a>
          <Badge variant="outline" className="text-muted-foreground">
            {data.category?.name}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SermonItem;
