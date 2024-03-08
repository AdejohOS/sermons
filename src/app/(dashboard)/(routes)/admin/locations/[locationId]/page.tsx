import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Trash } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import LocationForm from "./_components/location-form";

const AuthorDetailsPage = async ({
  params,
}: {
  params: { locationId: string };
}) => {
  const location = await db.location.findUnique({
    where: {
      id: params.locationId,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4">
          <LocationForm initialData={location} />
        </div>
      </div>
    </>
  );
};

export default AuthorDetailsPage;
