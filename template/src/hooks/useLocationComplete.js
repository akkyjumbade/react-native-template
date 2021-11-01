import { debounce } from "lodash-es";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { $http } from "../functions/http";
import http from "../utils/http";

async function getLocation(query) {
   try {
      const {data} = await $http.get(`/api/locations?q=${query}`)
      return data
   } catch (error) {
      throw error
   }
}

export default function useLocationComplete(initialValue = { q: '' }) {
   const location = useSelector(state => state.location)
   const dispatch = useDispatch()
   const { data: suggestions, status: suggestionsStatus } = useQuery('location_prefills', async () => {
      return await http.get(`/api/locations?q=nearby`)
   })
   const [ status, setStatus, ] = useState('INIT')
   const [ result, setResult, ] = useState(null)
   const [ error, setError, ] = useState(null)

   const getQuerySearches = debounce(() => {
      getLocation().then(res => {
         setResult(res)
      }).catch(console.error)
   }, 1000)

   useEffect(() => {
      getQuerySearches()
   }, [location.q])

   return {
      location,
      suggestions,
      suggestionsStatus,
      result,
      dispatch,
      error,
      status,
   }
}
