import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import {
  CalendarDays,
  Church,
  Copy,
  DownloadCloud,
  Link as LinkIcon,
  MapPinIcon,
  MicIcon,
  Share2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BsFacebook, BsTwitterX } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram, FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { format } from "date-fns";
import Comments from "./comments";
import FavoriteButton from "@/components/favourite";
import { RelatedSermon, Sermon } from "@/lib/types";

interface SermonDetailsProps {
  sermon: Sermon;
  relatedSermons: RelatedSermon[];
}

const SermonDetails = ({ sermon, relatedSermons }: SermonDetailsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <main className="md:col-span-4">
          <Card className="p-4">
            <div className="relative flex items-center justify-center">
              <Image
                width={300}
                height={300}
                src={sermon?.imageUrl || "/images/audioPlace.png"}
                alt="sermon image"
                className="object-fit rounded-md shadow-md"
              />
            </div>
            <Card className="bg-slate-50 p-4 mt-4">
              <p>
                <em className="font-bold">{sermon?.title} </em> -
                <span className="text-sm"> {sermon.author.name} </span>
              </p>
              <div className="flex items-center justify-between">
                <button
                  className="
          	          transition 
                      rounded-full 
                      flex 
                      items-center 
                      justify-center 
                    bg-green-500 
                      p-4 
                      drop-shadow-md 
                      group-hover:opacity-100 
                      hover:scale-110
      "
                >
                  <FaPlay className="text-black" />
                </button>
                <div className="flex items-center gap-3">
                  <FavoriteButton
                    sermonId={sermon.id}
                    favourites={sermon.favourites.map(
                      (favourite) => favourite.userId
                    )}
                  />
                  <Button variant="ghost">
                    <a
                      href=""
                      download
                      className="flex items-center gap-2 text-sm"
                    >
                      <DownloadCloud className="w-4 h-4" />
                      Download
                    </a>

                    {}
                  </Button>
                </div>
              </div>
            </Card>
            <Card className="p-4 mt-4 bg-slate-50">
              <p>{sermon?.about}</p>
              <Badge variant="outline" className="mt-4">
                {sermon?.category.name}
              </Badge>
            </Card>
          </Card>
        </main>

        <aside className="md:col-span-2">
          <Card className="p-4">
            <div>
              <h2 className="text-2xl font-bold">{sermon?.title}</h2>
              <div className="flex text-sm gap-2 text-muted-foreground">
                <p className="flex items-center gap-1">
                  <MicIcon className="h-3 w-3" /> {sermon?.author.name}
                </p>
                <p className="flex items-center gap-1">
                  <CalendarDays className=" h-3 w-3" />{" "}
                  {format(sermon?.dateDelivered || "", "MMMM do, yyyy")}
                </p>
              </div>
            </div>

            <p className="truncate text-xs my-2">
              Promising Gods Kingdom on earth and the rich cultural heraitage of
              the
            </p>

            <Separator className="my-6" />

            <>
              <p className="flex items-center gap-2">
                <Church className="h-4 w-4" /> {sermon?.location.name}
              </p>

              {sermon?.location.address && (
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 shrink-0" />
                  {sermon?.location.address}
                </p>
              )}
            </>

            <Separator className="my-6" />

            <div className="space-y-1">
              <p className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" /> Copy URL
              </p>

              <p className="bg-slate-50 text-sm py-1 px-2 rounded-md flex items-center">
                <span className="truncate">
                  https//www.sermons.com/sermons/{sermon.slug}{" "}
                </span>

                <Button variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
              </p>
            </div>
            <Separator className="my-6" />
            <div className="space-y-1">
              <p className="flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share Sermon
              </p>

              <p className="bg-slate-50 flex items-center gap-4 py-1 px-2 rounded-md flex-wrap ">
                <Button variant="ghost" size="icon">
                  <BsTwitterX size={20} className="hover:animate-pulse" />
                </Button>

                <Button variant="ghost" size="icon">
                  <BsFacebook size={20} className="hover:animate-pulse" />
                </Button>

                <Button variant="ghost" size="icon">
                  <MdOutlineMailOutline
                    size={20}
                    className="hover:animate-pulse"
                  />
                </Button>

                <Button variant="ghost" size="icon">
                  <FaInstagram size={20} className="hover:animate-pulse" />
                </Button>
              </p>
            </div>
          </Card>
        </aside>
      </div>

      <Separator className="my-6" />

      <>
        <h2 className="text-xl font-bold mb-6">Related Sermons</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {relatedSermons.length === 0 && (
            <p className="text-xl">No related sermon!</p>
          )}
          {relatedSermons.map((relatedSermon) => (
            <Link
              key={relatedSermon.id}
              href={`/sermons/${relatedSermon.slug}`}
              className="bg-white shadow-md"
            >
              <div className="overflow-hidden aspect-square relative">
                <Image
                  fill
                  src={relatedSermon.imageUrl || "/images/audioPlace.png"}
                  alt="sermon image"
                  className="object-fit"
                />
              </div>
              <div className="p-2">
                <h3 className="font-bold truncate">{relatedSermon.title}</h3>
                <span className="flex gap-1 items-center text-muted-foreground">
                  <CalendarDays className="h-3 w-3 shrink-0 " />
                  <p className="text-xs">
                    {format(
                      relatedSermon?.dateDelivered || "",
                      "MMMM do, yyyy"
                    )}
                  </p>
                </span>
                <span className="flex gap-1 items-center text-muted-foreground">
                  <MicIcon className="h-3 w-3 shrink-0" />
                  <p className="text-xs"> {relatedSermon?.author.name}</p>
                </span>
                <Badge variant="outline">{relatedSermon?.category.name}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </>
      <Separator className="my-6" />
      <>
        <div>
          <h2 className="mb-2 font-semibold">Comments (2)</h2>
          <Card>
            <Comments sermonId={sermon.id} />
          </Card>
        </div>
      </>
    </>
  );
};

export default SermonDetails;
