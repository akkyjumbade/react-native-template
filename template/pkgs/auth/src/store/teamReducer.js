const initialTeam = {
   title: '',
   logo: '',
   website: '',
   themeColor: 'red',
   members: [
      { name: '', email: '', invited_at: null, joined_at: null }
   ],
}
const initialState = {
   teams: [
      initialTeam
   ],
   currentTeam: null,
   ownedTeams: null,
}

export const T_SET_CURRENT_TEAM = 'SET_CURRENT_TEAM';
export const T_SET_TEAMS = 'T_SET_TEAMS';
export const T_SET_MEMBERS = 'T_SET_MEMBERS';

export default function teamReducer(state = initialState, action) {
   switch (action.type) {
      case T_SET_CURRENT_TEAM:
         state = {
            ...state,
            currentTeam: action.payload
         }
      break;
      case T_SET_TEAMS:
         state = {
            ...state,
            teams: action.payload
         }
         break;
      case T_SET_MEMBERS:
         state = {
            ...state,
            teams: action.payload
         }
         break;
      default:
         //
         break;
   }
   return state
}
