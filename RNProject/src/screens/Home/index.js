import React, { Fragment } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import Page from "@modules/rn-kit/layouts/Page";
import Text from "@modules/rn-kit/atoms/Text";
import useTranslation from "@/hooks/useTranslation";
import ContentLoader, { Circle, Code, Facebook, Rect } from 'react-content-loader/native'

const MyLoader = () => (
   <Fragment>
      <ContentLoader viewBox="0 0 380 70">
         <Circle cx="30" cy="30" r="30" />
         <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
         <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
   </Fragment>
 )

const DoorDashFavorite = props => (
   <ContentLoader
     width={370}
     height={400}
     viewBox="0 0 400 400"
     backgroundColor="#f0f0f0"
     foregroundColor="#dedede"
     {...props}
   >
     <Rect x="0" y="304" rx="4" ry="4" width="271" height="9" />
     <Rect x="0" y="323" rx="3" ry="3" width="119" height="6" />
     <Rect x="0" y="77" rx="10" ry="10" width="388" height="217" />
   </ContentLoader>
)
const HomeScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page scroll={true}>
         <Page.Container>
            <DoorDashFavorite />
            <Facebook />
            <Code />
            <Facebook />
            <Code />
            <Facebook />
            <Facebook />
            <Code />
            <Facebook />
            <Code />
            <Facebook />
         </Page.Container>
      </Page>
   )
}

HomeScreen.propTypes = {
   // prop: PropTypes.string
}

HomeScreen.defaultProps = {

}

export default HomeScreen
