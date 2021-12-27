import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ChevronRightIcon = (props) => (
   <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      width={24}
      height={24}
      {...props}
   >
      <Path
         fillRule="evenodd"
         d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z"
         clipRule="evenodd"
      />
   </Svg>
)

export default ChevronRightIcon
