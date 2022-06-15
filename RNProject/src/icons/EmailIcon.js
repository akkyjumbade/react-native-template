import * as React from "react"
import Svg, { Path } from "react-native-svg"

const EmailIcon = (props) => (
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
         d="M14.243 5.757a6 6 0 1 0-.986 9.284 1 1 0 1 1 1.087 1.678A8 8 0 1 1 18 10a3 3 0 0 1-4.8 2.401A4 4 0 1 1 14 10a1 1 0 1 0 2 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"
         clipRule="evenodd"
      />
   </Svg>
)

export default EmailIcon
