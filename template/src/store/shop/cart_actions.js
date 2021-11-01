import localStorage from "../../localStorage"
import { T_CART_ADD, T_CART_REMOVE } from "./cart_reducer"

async function saveCart(items) {
   localStorage.save({ key: 'CartItems', data: JSON.stringify(items) })
}
export function add_item_cart_action(item) {
   return async (dispatch, getState) => {
      dispatch({ type: T_CART_ADD, payload: item, })
      const cartItems = getState(state => state.cart.items)
      await saveCart(cartItems)
   }
}
export function remove_item_cart_action(item) {
   return async (dispatch, getState) => {
      dispatch({ type: T_CART_REMOVE, payload: item, })
      const cartItems = getState(state => state.cart.items)
      await saveCart(cartItems)
   }
}
