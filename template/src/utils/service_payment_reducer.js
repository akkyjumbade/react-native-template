export const initialFormState = {
   operator_id: null,
   customer_number: null,
   amount: null,
}
export default function service_payment_reducer(state, action) {
   switch (action.type) {
      case 'SET_OPERATOR':
         state = {
            ...state,
            operator_id: action.payload,
         }
         break;
      case 'SET_CUSTOMER':
         state = {
            ...state,
            customer_number: action.payload,
         }
         break;
      case 'SET_AMOUNT':
         state = {
            ...state,
            amount: action.payload,
         }
         break;

      default:
         break;
   }
   return state;
}
