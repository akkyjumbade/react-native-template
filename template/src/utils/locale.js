import contents from '../locale/en/index.json'
// import contents_mr from '../locale/mr/index.json'
import store from '../store'

export default function __(txt) {
   const lang = store.getState().config.display_language
   if (contents[txt]) {
      return contents[txt]
   }
   return txt
}

export function _t(txt) {
   if (contents[txt]) {
      return contents[txt]
   }
   return txt
}
