import * as React from "react"
import Svg, { Path } from "react-native-svg"

const AttachmentIcon = (props) => (
  <Svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M8 4a3 3 0 0 0-3 3v4a5 5 0 0 0 10 0V7a1 1 0 1 1 2 0v4a7 7 0 1 1-14 0V7a5 5 0 0 1 10 0v4a3 3 0 1 1-6 0V7a1 1 0 0 1 2 0v4a1 1 0 1 0 2 0V7a3 3 0 0 0-3-3z"
      clipRule="evenodd"
    />
  </Svg>
)

export default AttachmentIcon
