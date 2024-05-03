import { getSermons } from "@/server/actions/get-sermon";
import { useQuery } from "@tanstack/react-query";

export function useGetSermons() {
  return useQuery({
    queryFn: async () => getSermons(),
    queryKey: ["sermons"],
  });
}
