import React, {  } from 'react';
import {Share, StyleSheet, useColorScheme, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { Center, Divider, HStack, Image, List } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import { useNavigation } from '@react-navigation/core';
import icons from '@/icons';
import useTranslation from '@/hooks/useTranslation';
import { SCREEN } from '@/config';
import { Hyperlink, IconButton, ButtonPrimary } from '@modules/rn-kit/atoms';
import { API_URL } from '@/utils/http';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';
const avatarPlaceholderImage = require('../../../assets/avatar_placeholder.jpeg')
const referBannerUrl = require('../../../assets/avatar_placeholder.jpeg')

const styles = StyleSheet.create({
   banner: {
      width: (SCREEN.width - 30),
      height: (SCREEN.width - 30),
      alignSelf: 'center',
      backgroundColor: '#ccc',
      marginBottom: 15,
      borderRadius: 15,
   }
})

function shareLinkAsync() {
   Share.share({
      title: 'Refer & earn',
      message: 'Refer & earn rewards',
      url: API_URL,
   })
}

const ReferScreen = ({ user, isAuthenticated, options }) => {
   const nav = useNavigation()
   const __ = useTranslation();
   const colorScheme = useColorScheme()
   const dispatch = useDispatch()
   console.log({ colorScheme })

   if (!user) {
      return null
   }
   const { teams = null } = user
   if (!user) {
      return null
   }

   return (
      <Page scroll={false}>
         <Page.Container>
            <Page.Title>Refer & earn</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, alignItems: 'center'  }}>
               <Image
                  source={referBannerUrl}
                  style={styles.banner}
                />
               <Text style={{ marginBottom: 15 }}>Share the link</Text>
               {/* <HStack alignItems={'center'} space={8} style={{ marginVertical: 15 }}>
                  <IconButton icon="user" />
                  <IconButton icon="user" />
                  <IconButton icon="user" />
                  <IconButton icon="user" />
               </HStack> */}
               <ButtonPrimary title={'Share link'} onPress={shareLinkAsync} />
            </View>
         </Center>
         <Page.Container style={{ marginBottom: 30 }}>
            <Text bold fontSize={'lg'}>How Refer & Earn works</Text>
            <Text>Login & we will assign a unique referral code. Share the link to join the app.</Text>
            {/* <Text>Invite</Text>
            <Text>Earn</Text> */}
         </Page.Container>

      </Page>
   );
};

ReferScreen.propTypes = {
   // prop: PropTypes.string
};

ReferScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   options: state.options,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(ReferScreen);
