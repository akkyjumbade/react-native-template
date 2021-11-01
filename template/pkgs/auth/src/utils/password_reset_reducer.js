
export const initialStateForPassword = {
   requested: false,
   otp_sent: false,
   verified: false,
   phone: null,
   email: null,
   done: false
}

export const T_REQUEST_SUMBIT = 'REQUEST_SUMBIT'
export const T_VERIFICATION_SENT = 'VERIFICATION_SENT'
export const T_VERIFIED = 'VERIFIED'
export const T_DONE = 'DONE'

const password_reset_reducer = (state = initialStateForPassword, action) => {
   switch (action.type) {
      case T_REQUEST_SUMBIT:
         state = {
            ...state,
            requested: true,
         }
         break;
      case T_VERIFICATION_SENT:
         state = {
            ...state,
            otp_sent: true,
         }
         break;
      case T_VERIFIED:
         state = {
            ...state,
            verified: true,
         }
         break;
      case T_DONE:
         state = {
            ...state,
            done: true,
         }
         break;
      default:
         break;
   }
   return state
}

export default password_reset_reducer
