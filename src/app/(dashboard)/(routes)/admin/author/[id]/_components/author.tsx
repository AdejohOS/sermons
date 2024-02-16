import { Card } from "@/components/ui/card";
import { Author } from "@prisma/client";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Facebook, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AuthorProps {
  author: Author;
}
const Author = ({ author: { name, imageUrl, aboutAuthor } }: AuthorProps) => {
  return (
    <div className="">
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center p-2 ">
        <div className="relative h-[400px] w-[400px] rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="authorImage"
            fill
            className="object-cover "
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="italic">{aboutAuthor}</p>

          <div>
            <h3 className="text-xl font-semibold">Social Media</h3>
            <div className="mt-2">
              <Link
                href="/"
                className="flex items-center gap-2 hover:animate-bounce"
              >
                <TwitterLogoIcon className="w-5 h-5" />
                @rev_Chukwurah
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 hover:animate-bounce"
              >
                <Facebook className="w-5 h-5" />
                @rev_Chukwurah
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 hover:animate-bounce"
              >
                <InstagramLogoIcon className="w-5 h-5" />
                @rev_Chukwurah
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Author;
