import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import useTranslation from '../hooks/useTranslation'
import { useTheme } from 'styled-components'
import { Text } from '@modules/rn-kit'
import colors from '@modules/rn-kit/themes/colors'

const StyledBottomView = styled.View`
   background: ${({ theme }) => theme.colors.light};
   elevation: 0;
   flex-direction: row;
   align-items: center;
   justify-content: space-around;
`
const styles = StyleSheet.create({
   tabBar: {
      // borderTopColor: colors.light,
      // borderTopWidth: 1,
      elevation: 6,
      height: 70,
   },
   tabItem: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
   },
   tabIcon: {
      marginBottom: 4,
   }
})

const StyledTabItem = styled.TouchableOpacity`

`

const TabBarItem = ({ onClick, icon, label, activeTab, nav }) => {
   let activeIconColor = {
      color: colors.gray
   }
   if (activeTab) {
      activeIconColor = {
         color: '#000'
      }
   }
   return (
   <StyledTabItem active={activeTab} style={styles.tabItem} onPress={onClick} >
      {/* <Icon lib={'FontAwesome5'} size={24} onPress={onClick} {...activeIconColor} style={[styles.tabIcon, ]} name={icon} /> */}
      {/* {activeTab && (
         <Text >{label}</Text>
      )} */}
      {1 && (
         <Text >{label}</Text>
      )}
   </StyledTabItem>
   )
}
const BottomTabNavigation = ({ selectedTheme, state, descriptors, navigation, ...props }) => {
   const [ activeTab,  setActiveTab ] = useState(null)
   const __ = useTranslation()
   const theme = useTheme()
   useEffect(() => {
      // console.log({ state })
      setActiveTab(state.index)
   }, [state])

   function navigate(routeName) {
      // alert('clicked')
      navigation.navigate(routeName)
   }
   return (
      <StyledBottomView style={[styles.tabBar, { backgroundColor: theme?.colors.primary }]}>
         <TabBarItem activeTab={activeTab === 0} icon={'home'} label={__('home_menu')} onClick={_ => navigate('home')} nav={navigation} />
         <TabBarItem activeTab={activeTab === 1} icon={'search'} label={__('market_menu')} onClick={_ => navigate('explore')} nav={navigation} />
         <TabBarItem activeTab={activeTab === 2} icon={'list'} label={__('dashboard_menu')} onClick={_ => navigate('dashboard')} nav={navigation} />
         <TabBarItem activeTab={activeTab === 3} icon={'user-circle'} label={__('profile_menu')} onClick={_ => navigate('profile')} nav={navigation} />
      </StyledBottomView>
   )
}

export default connect(state => ({
   selectedTheme: state.options.appearance_theme,
}))(BottomTabNavigation)
