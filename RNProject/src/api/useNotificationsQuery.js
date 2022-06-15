import useApiQuery from "@/hooks/useApiQuery";
import { useQuery } from "react-query";


export default function useNotificationsQuery() {
   const url = `/api/me/notifications`
   return useApiQuery(url, {
      // refetchInterval: (1000 * 6)
   })
}
