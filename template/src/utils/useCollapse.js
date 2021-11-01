import { useState } from "react"

export default function useCollapse({ expanded } = {}) {
   const [isExpanded, setExpanded] = useState(() => Boolean(expanded))
   function toggle() {
      setExpanded(prev => !prev)
   }
   return {
      toggle,
      isExpanded
   }
}
