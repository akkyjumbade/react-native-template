import { T_SET_TEAMS } from "./team.reducer";

function loadMyTeams() {
   return async (dispatch, getState, { server }) => {
      try {
         const { data: res } = await server().get(`/api/v1/teams`)
         dispatch({
            type: T_SET_TEAMS,
            payload: res?.data
         })
      } catch (e) {
         console.warn('error-loading-teams: ', { e })
      }
   }
}

function addMemberToTeam(team, member) {
   return async (dispatch, getState, { server }) => {
      try {
         const { data: res } = await server().get(`/api/v1/teams`)
         dispatch({
            type: T_SET_TEAMS,
            payload: res?.data
         })
      } catch (e) {
         console.warn('error-adding-team-member: ', { e })
      }
   }
}

function setCurrentTeam() {
   return async (dispatch, getState, { server }) => {
      try {

      } catch (e) {

      }
   }
}

function verifyTeam() {
   return async (dispatch, getState, { server }) => {
      try {

      } catch (e) {

      }
   }
}

export default {
   setCurrentTeam,
   loadMyTeams,
   addMemberToTeam,
   verifyTeam,
}
