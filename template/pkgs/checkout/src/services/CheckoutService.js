import http, { server } from "../../../../src/utils/http"

const payment_modes = [
   {
      label: 'Pay Online',
      value: 'online',
   },
   {
      label: 'Pay on delivery',
      value: 'COD',
   },
]
export default class CheckoutService {
   user = {}
   items = []
   billing = {}
   coupon_code = null
   shipping_charges = 0
   tax = 0
   subtotal = 0
   total = 0
   order_type = 'order'
   errors = null
   payment_modes = payment_modes

   constructor(user, params = {}) {
      this.user = user
      // set initial params
      if (params.type) {
         this.order_type = params.type
      }
   }
   // setter
   setBilling(values = {}) {
      this.billing = values
   }
   // set items
   setItems(items = []) {
      this.items = items
   }

   async save() {
      console.log(this.user)
      console.log(this.items)
      console.log(this.billing)
      try {
         const { data } = await server().post(`/api/v1/checkout?action=SAVE`, {
            user: this.user,
            billing: this.billing,
            items: this.items,
            coupon_code: this.coupon_code,
         })
         return data;
      } catch (error) {
         console.log({ error: JSON.stringify(error?.response?.data) })
         return error
      }
   }
   async applyCoupon(coupon_code) {
      try {
         const { data } = await server().post(`/api/v1/checkout?action=COUPON_CODE`, {
            coupon_code
         })
         if (data?.ok) {
            this.coupon_code = coupon_code
         }
         return data;
      } catch (error) {
         return error
      }
   }
   async checkDelivery() {
      try {
         const { data } = await server().post(`/api/v1/checkout?action=COUPON_CODE`, {
            delivery: this.billing,
         })
         if (data?.ok) {
            this.billing = this.billing
         }
         return data;
      } catch (error) {
         return error
      }
   }
}
