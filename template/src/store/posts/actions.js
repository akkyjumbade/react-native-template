import http from "../../utils/http"
import { T_SET_SERVICE_UPDATE } from "../services/service_reducer"


export const load_posts_action = action => {
   return async (dispatch, getState, { api, }) => {
      try {
         const { data } = await api.get(`/api/v1/app_posts`)
         dispatch({ type: 'SET_POSTS', payload: data?.data })
         if (data?.data?.services) {
            dispatch({ type: T_SET_SERVICE_UPDATE, payload: {
               services: data?.data?.services
            }});
         }
      } catch (error) {
         const { data } = await api.get(`/api/v1/app_posts`)
         dispatch({ type: 'SET_POSTS', payload: data?.data })
         console.warn(JSON.stringify({ error  }))
         dispatch({ type: 'SET_POSTS', payload: { error } })
      }
   }
}


export const load_store_action = action => {
   return async (dispatch, getState, { api, }) => {
      try {
         const { data } = await http.get(`/api/v1/app_store_posts`)
         dispatch({ type: 'SET_POSTS', payload: data })
         dispatch({ type: 'SET_POSTS', payload: data })
      } catch (error) {
         const { data } = await http.get(`/api/v1/app_store_posts`)
         dispatch({ type: 'SET_POSTS', payload: data })
         dispatch({ type: 'SET_POSTS', payload: data })

         console.warn(JSON.stringify({ error  }))
         dispatch({ type: 'SET_POSTS', payload: { error } })
         throw error;
      }
   }
}

export const load_category_action = action => {
   return async (dispatch, getState, { api, }) => {
      try {
         const { data } = await api.get(`/api/v1/app_store_category?id=${action.payload}`)
         dispatch({ type: 'SET_CATEGORY_INFO', payload: data.data })
      } catch (error) {
         // console.warn(JSON.stringify({ error  }))
         dispatch({ type: 'SET_POSTS', payload: { error } })
         throw error;
      }
   }
}
