import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SearchIcon = (props) => (
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
         d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8z"
         clipRule="evenodd"
      />
   </Svg>
)

export default SearchIcon
