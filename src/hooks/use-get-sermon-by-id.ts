import { db } from "@/lib/db";
import { Author, Category, Sermon, Location } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { error } from "console";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export type ExtendedSermon = Sermon & {
  author: Author;
  category: Category;
  location: Location;
};

const useGetSermonById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sermon, setSermon] = useState<ExtendedSermon | undefined>(undefined);
  const params = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSermon = async () => {
      const { data } = await axios.get(`/api/sermon/${params.sermonId}`);

      setSermon(data as ExtendedSermon);

      setIsLoading(false);
    };
    fetchSermon();
  }, [id]);

  return useMemo(
    () => ({
      isLoading,
      sermon,
    }),
    [isLoading, sermon]
  );
};

export default useGetSermonById;
