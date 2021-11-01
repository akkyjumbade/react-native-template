export const T_SET_RESOURCES = 'T_SET_RESOURCES'

const initialState = {
   categories: null,
}

export default function resources_reducer(state = initialState, action) {
   switch (action.type) {
      case T_SET_RESOURCES:
         state = {
            ...state,
            ...action.payload
         }
         break;
      default:
         break;
   }
   return state
}


export const preloadResourcesAction = async (dispatch, getState, { server }) => {
   try {
      const { data } = await server().get(`/api/v1`);
      dispatch({
         type: T_SET_RESOURCES,
         payload: data
      })
   } catch (error) {
      console.warn({ error })
   }
}
