import axios from 'axios'
import store from '../store';

// export const baseURL = 'http://thespot-trendyminds.codeweight.com'
export const baseURL = 'http://thespot-trendyminds.codeweight.com/'
export const SERVER_URL = SERVER_URL;
export const API_URL = `${SERVER_URL}/api/v1`;

const http = axios.create({
   baseURL,
   headers: {
      Accept: 'application/json'
   }
})

const headers = {
   Accept: 'application/json'
}

export const server = () => {
   const { auth: { token } } = store.getState()
   return axios.create({
      baseURL,
      headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${token}`,
      }
   })
}

export const defaultQueryFn = async ({ queryKey }) => {
   const { data } = await server().get(queryKey[0])
   return data
}

export default http
