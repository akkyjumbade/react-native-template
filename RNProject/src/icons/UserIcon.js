import * as React from "react"
import Svg, { Path } from "react-native-svg"

const UserIcon = (props) => (
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
      d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9a7 7 0 1 1 14 0H3z"
      clipRule="evenodd"
    />
  </Svg>
)

export default UserIcon
