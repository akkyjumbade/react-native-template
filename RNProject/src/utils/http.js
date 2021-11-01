import axios from 'axios'
import { QueryClient } from 'react-query';
import { SERVER_URL } from '../config';

export const baseURL = SERVER_URL
export const API_URL = `${SERVER_URL}/api/v1`;

const headers = {
   Accept: 'application/json'
}
const http = (headersParams = {}) => axios.create({
   baseURL,
   headers: {
      ...headers,
      ...headersParams
   }
})


export const server = ({ token }) => {
   return axios.create({
      baseURL,
      headers: {
         ...headers,
         Authorization: `Bearer ${token}`,
      }
   })
}

export const defaultQueryFn = async ({ queryKey }) => {
   const { data } = await server().get(queryKey[0])
   return data
}

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         queryFn: defaultQueryFn
      }
   }
})

export default http
