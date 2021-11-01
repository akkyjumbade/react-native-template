import { sumBy } from "lodash-es"

// Initial State of order
const initialState = {
   items: null,
   subtotal: 0,
   tax: 0,
   coupon_code: null,
   shipping_charges: 0,
   shipping_method: 'standard',
   payment_mode: 'online',
   payment_status: 'pending',
   status: 'draft',
   total: 0,
   type: 'product-order',
   user_id: null,
   is_gift: false,
   use_wallet_balance: false,
   distance: {
      km: 0,
      rate: 0,
   },
   billing: {},
   shipping: {},
}

// Action types
export const T_CHECKOUT_SET_ADDRESS = 'CHECKOUT_SET_ADDRESS'
export const T_CHECKOUT_SET_ITEMS = 'CHECKOUT_SET_ITEMS'
export const T_CHECKOUT_SET_PAYMENT_MODE = 'CHECKOUT_SET_PAYMENT_MODE'
export const T_CHECKOUT_SET_COUPON = 'CHECKOUT_SET_COUPON'
export const T_CHECKOUT_SET_IS_GIFT = 'CHECKOUT_SET_IS_GIFT'
export const T_CHECKOUT_SET_SUBTOTAL = 'CHECKOUT_SET_SUBTOTAL'
export const T_CHECKOUT_SET_TAX = 'CHECKOUT_SET_TAX'
export const T_CHECKOUT_SET_SHIPPING_CHARGES = 'CHECKOUT_SET_SHIPPING_CHARGES'
export const T_CHECKOUT_SET_TOTAL = 'CHECKOUT_SET_TOTAL'
export const T_CHECKOUT_UPDATE = 'CHECKOUT_UPDATE'

export const checkout_reducer = (state = initialState, action) => {
   switch (action.type) {
      case T_CHECKOUT_SET_ADDRESS:
         return {
            ...state,
            billing_address: action.payload
         }
      case T_CHECKOUT_SET_PAYMENT_MODE:
         return {
            ...state,
            payment_mode: action.payload
         }
      case T_CHECKOUT_SET_COUPON:
         return {
            ...state,
            coupon_code: action.payload
         }
      case T_CHECKOUT_SET_IS_GIFT:
         return {
            ...state,
            is_gift: action.payload
         }
      case T_CHECKOUT_SET_TAX:
         return {
            ...state,
            tax: action.payload
         }
      case T_CHECKOUT_SET_SHIPPING_CHARGES:
         return {
            ...state,
            shipping_charges: action.payload
         }
      case T_CHECKOUT_SET_SUBTOTAL:
         return {
            ...state,
            subtotal: action.payload
         }
      case T_CHECKOUT_SET_TOTAL:
         return {
            ...state,
            total: action.payload
         }
      case T_CHECKOUT_SET_ITEMS:
         return {
            ...state,
            items: action.payload
         }
      case T_CHECKOUT_UPDATE:
         return {
            ...state,
            ...action.payload
         }
      default:
         break;
   }
   return state
}

export function setPaymentModeAction(val) {
   return async (dispatch, getState, { server }) => {
      dispatch({ type: T_CHECKOUT_SET_PAYMENT_MODE, payload: val })
   }
}
export function useFromWalletAction(checked = false) {
   return async (dispatch, getState, { server }) => {
      dispatch({ type: T_CHECKOUT_UPDATE, payload: {
         use_wallet_balance: checked
      } })
   }
}

export function setDeliveryAction(payload) {
   return async (dispatch, getState, { server, }) => {
      dispatch({ type: T_CHECKOUT_SET_ADDRESS, payload: payload })
   }
}
export function setItemsAction(payload) {
   return async (dispatch, getState, { server }) => {
      const items = Object.values(payload)
      const subtotal = sumBy(items, row => row.qty * Number(row?.price))
      dispatch({ type: T_CHECKOUT_SET_ITEMS, payload: payload })
      dispatch({ type: T_CHECKOUT_UPDATE, payload: {
         subtotal,
         total: subtotal,
      } })
   }
}

export function prepareCheckoutAction(payload = {}) {
   return async (dispatch, getState, { server }) => {
      dispatch({ type: T_CHECKOUT_UPDATE, payload: payload })
   }
}
