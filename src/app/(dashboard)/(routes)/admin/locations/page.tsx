import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { LocationColumn } from "./_components/columns";
import { LocationClient } from "./_components/client";

export const revalidate = 0;

const LocationPage = async () => {
  const myLocations = await db.location.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedLocation: LocationColumn[] = myLocations.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Locations</h2>
        <Link href="/admin/locations/create">
          <button className="flex items-center border p-2 rounded-md text-green-700 hover:bg-green-200">
            <PlusCircle className="w-4 h-4 shrink-0 mr-2 " />
            Add a location
          </button>
        </Link>
      </div>

      <div className="flex-col">
        <div className="flex-1 space-y-4  pt-6">
          <LocationClient data={formattedLocation} />
        </div>
      </div>
    </>
  );
};

export default LocationPage;
