import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ExclaimationMarkIcon = (props) => (
  <Svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
    />
  </Svg>
)

export default ExclaimationMarkIcon
