import React, {  } from 'react';
import {useColorScheme, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { Center, Divider, HStack, List } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import { useNavigation } from '@react-navigation/core';
import icons from '@/icons';
import useTranslation from '@/hooks/useTranslation';
import useBiometrics from '@/hooks/useBiometrics';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';

const SecurityDashboardScreen = ({ user, isAuthenticated, options }) => {
   const nav = useNavigation()
   const __ = useTranslation();
   const colorScheme = useColorScheme()
   const dispatch = useDispatch()
   const { authenticate } = useBiometrics()
   console.log({ colorScheme })

   if (!user) {
      return null
   }
   const { teams = null } = user
   function configureBiometricAuthentication() {
      // alert('To be implemented');
      authenticate().then(response => {
         alert("Authentication successful.")
      }).catch(error => {
         alert(error.message)
      });

   }
   if (!user) {
      return null
   }


   return (
      <Page scroll={true}>
         <Page.Container>
            <Page.Title>Security</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, }}>

               <List
                  style={{ marginBottom: 15, borderWidth: 0 }}
                  divider={<Divider />}
                  space={1}
                  >
                  <List.Item onPress={() => nav.navigate('profile.change_password')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Change password')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{__('Last update: 3 months ago.')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('profile.change_password')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Set PIN')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={configureBiometricAuthentication}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Unlock with Biometric')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
               </List>

            </View>
         </Center>

      </Page>
   );
};

SecurityDashboardScreen.propTypes = {
   // prop: PropTypes.string
};

SecurityDashboardScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   options: state.options,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(SecurityDashboardScreen);
