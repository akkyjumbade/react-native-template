import axios from "axios";
import localStorage from "../localStorage";

export const SERVER_URL = 'https://stpatil.in';
export const API_URL = `${SERVER_URL}/api/v1`;

export const $http = axios.create({
   baseURL: SERVER_URL,
   headers: {
      Accept: 'application/json',
   }
});

export function serverUrl(url) {
   return SERVER_URL + url
}

export const $server = async () => {
   const token = await localStorage.load({ key: '@token', })
   return axios.create({
      baseURL: SERVER_URL,
      headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${token}`,
      }
   })
}

export const server = $server


