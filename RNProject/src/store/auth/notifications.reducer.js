
const initialState = {
   unreadNotifications: null,
   allNotifications: null,
   status: 'INIT',
}
export const T_LOAD_NOTIFICATIONS = 'T_LOAD_NOTIFICATIONS'
export const T_LOAD_NOTIFICATIONS_UNREAD = 'T_LOAD_NOTIFICATIONS_UNREAD'
export const T_SET_NOTIFICATIONS_STATUS = 'T_SET_NOTIFICATIONS_STATUS'

export default function notifications_reducer(state = initialState, action) {
   switch (action.type) {
      case T_LOAD_NOTIFICATIONS:
         state = {
            ...state,
            allNotifications: action.payload,
         }
         break;
      case T_LOAD_NOTIFICATIONS_UNREAD:
         state = {
            ...state,
            unreadNotifications: action.payload,
         }
         break;
      case T_SET_NOTIFICATIONS_STATUS:
         state = {
            ...state,
            status: action.payload,
         }
         break;

      default:
         // throw new Error('Invalid action performed at notifications_reducer')
         break;
   }
   return state
}


export const load_notifications_action = () => {
   return async (dispatch, getState, { server }) => {
      dispatch({ type: T_SET_NOTIFICATIONS_STATUS, payload: 'LOADING' })
      try {
         const { data } = await server().get(`/api/v1/my_notifications`)
         // console.info({ data })
         if (data?.data) {
            dispatch({ type: T_LOAD_NOTIFICATIONS, payload: data?.data })
            // calc unread
            const unreadNotifications = data?.data?.filter(item => {
               return item.read_at
            })
            if (unreadNotifications) {
               dispatch({ type: T_LOAD_NOTIFICATIONS_UNREAD, payload: unreadNotifications })
            }
         }
      } catch (error) {
         console.log('ErrorNotificationsReducer.1');
      } finally {
         dispatch({ type: T_SET_NOTIFICATIONS_STATUS, payload: 'READY' })
      }
   }
}
