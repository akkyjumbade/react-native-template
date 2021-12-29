import { useQuery } from "react-query";
import {server} from "@/utils/http";
import {useSelector} from "react-redux";

export default function useApiQuery(path) {
   const token = useSelector(state => state.auth.token)

   return useQuery(path, async () => {
      console.info({ token, path })
      return await server({ token }).get(path)
   })
}
