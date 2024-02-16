import { PlayButton } from "@/components/play-button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarDays, MicIcon } from "lucide-react";
import Image from "next/image";

export const Sermons = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <div className="relative group cursor-pointer transition border-b shadow-md bg-background rounded-md overflow-hidden">
        <div className="relative aspect-square ">
          <Image
            src="/images/sitting.webp"
            alt="image"
            fill
            className="object-cover"
          />
        </div>
        <div className="my-4 p-1">
          <span className="flex gap-1 items-center text-muted-foreground">
            <CalendarDays className="h-3 w-3 shrink-0 " />
            <p className="text-xs">2nd April, 2024</p>
          </span>
          <span className="flex gap-1 items-center text-muted-foreground">
            <MicIcon className="h-3 w-3 shrink-0" />
            <p className="text-xs">Prof. Jenkeri Zakari</p>
          </span>
          <p className="font-medium truncate mt-2 ">
            Sitting on top of the world
          </p>
          <div className="flex justify-end mt-2 text-muted-foreground">
            <Badge variant="outline" className="text-muted-foreground">
              family series
            </Badge>
          </div>
        </div>

        <div
          className="
          absolute 
          bottom-32 
          right-5
        "
        >
          <PlayButton />
        </div>
      </div>
      <div className="relative group cursor-pointer transition border-b shadow-md bg-background rounded-md overflow-hidden">
        <div className="relative aspect-square ">
          <Image
            src="/images/oladips.webp"
            alt="image"
            fill
            className="object-cover"
          />
        </div>
        <div className="my-4 p-1">
          <span className="flex gap-1 items-center text-muted-foreground">
            <CalendarDays className="h-3 w-3 shrink-0" />{" "}
            <p className="text-xs">27th June, 2024</p>
          </span>
          <span className="flex gap-1 items-center text-muted-foreground">
            <MicIcon className="h-3 w-3 shrink-0" />{" "}
            <p className="text-xs">Apostle Nas Moro</p>
          </span>
          <p className="font-medium truncate mt-2">The blood of the Lamb</p>
          <div className="flex justify-end mt-2 text-muted-foreground">
            <Badge variant="outline" className="text-muted-foreground">
              miracle service
            </Badge>
          </div>
        </div>

        <div
          className="
          absolute 
          bottom-32 
          right-5
        "
        >
          <PlayButton />
        </div>
      </div>
    </div>
  );
};
