import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { Avatar, Box, Center, Divider, HStack, List, Select, useToast, VStack } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import Icon from '@modules/rn-kit/atoms/Icon';
import { useNavigation } from '@react-navigation/core';
import { auth_logout_action } from '@/store/auth/auth.actions';
import icons from '@/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary';
import Button from '@modules/rn-kit/atoms/Button';
import config, { APP_VERSION } from '@/config';
import LogoutActionDialogue from '@/components/dialogues/LogoutActionDialogue';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import useTranslation from '@/hooks/useTranslation';
import ProfilePhotoUpdate from '@/components/ProfilePhotoUpdate';
import { alert } from '@modules/rn-kit/utils/alert';
import Card from '@/components/Card';
import { useFormik } from 'formik';
import CheckIcon from '@/icons/CheckIcon';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';
const avatarPlaceholderImage = require('../../../assets/avatar_placeholder.jpeg')
import timezones from '@/config/timezones'
import { useLocale } from '@/providers/LocaleProvider';
import * as RNLocalize from 'react-native-localize'

const BillingScreen = ({ user, isAuthenticated, initialValues = {} }) => {
   const nav = useNavigation()
   const __ = useTranslation();
   const config = useSelector(state => state.options)
   const currencies = RNLocalize.getCurrencies()
   const formik = useFormik({
      initialValues
   })
   if (!user) {
      return null
   }
   if (!user) {
      return null
   }

   return (
      <Page  >
         <Page.Container>
            <Page.Title>Billing</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, }}>
               <List
                  style={{ marginBottom: 15, borderWidth: 0 }}
                  divider={<Divider />}
                  space={1}
                  >
                  <List.Item onPress={() => nav.navigate('billing')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Country')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{config.country}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('billing')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Default currency')}</Text>
                        </View>
                        <View>
                           <Select
                              selectedValue={config.currency}
                              minWidth={200}
                              accessibilityLabel={'Choose currency'}
                              placeholder={'Choose currency'}
                              mt={1}
                              onValueChange={selectedValue => {
                                 formik.setFieldValue('currency', selectedValue)
                              }}

                           >
                              {currencies?.length && currencies.map(crn => (
                              <Select.Item key={crn} label={crn} value={crn} />
                              ))}
                           </Select>
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('billing')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Timezone')}</Text>
                        </View>
                        <View>
                           <Select
                              selectedValue={config.timezone}
                              minWidth={200}
                              accessibilityLabel={'Choose timezone'}
                              placeholder={'Choose timezone'}
                              // _selectedItem={{
                              //    endIcon: <CheckIcon size="5" />,
                              //  }}
                              mt={1}
                              onValueChange={selectedValue => {
                                 formik.setFieldValue('timezone', selectedValue)
                              }}

                           >
                              {/* <Select.Item label="Choose" value="ux" /> */}
                              {timezones && timezones.map(tz => (
                              <Select.Item key={tz.value} label={tz.label} value={tz.value} />
                              ))}
                           </Select>
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item >

                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1,  }}>
                           <Text>{__('Billing (Default)')}</Text>
                        </View>
                        <View>
                           <Select
                              selectedValue={formik.values.default_billing_address_id}
                              minWidth={200}
                              accessibilityLabel={'Choose billing address'}
                              placeholder={'Choose billing address'}
                              // _selectedItem={{
                              //    endIcon: <CheckIcon size="5" />,
                              //  }}
                              mt={1}
                              onValueChange={selectedValue => {
                                 if (selectedValue === '0') {
                                    nav.navigate('address.add')
                                    return
                                 } else {
                                    formik.setFieldValue('default_billing_address_id', selectedValue)
                                 }
                              }}

                           >
                              <Select.Item label="Choose" value="ux" />
                              <Select.Item  leftIcon={() => (
                                 <icons.clipboardListIcon width={20} height={20} />
                              )} label="Add new address" value="0" />
                           </Select>
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item >
                     <Text>{__('Transactions')}</Text>
                  </List.Item>
               </List>
            </View>
         </Center>
         <Page.Container>
            <VStack space={1} style={{ marginBottom: 20, alignItems: 'center', width: '100%' }}>
               {/* <VStack space={1} style={{ marginBottom: 5, alignItems: 'center' }}>
                  <Text>{__('Logged in as')}</Text>
                  <Text>{user.email}</Text>
               </VStack>
               <Text>{__('version ') + config.appVersion}</Text> */}
            </VStack>
            <View style={{ marginBottom: 20 }}>
               {formik.dirty && (
               <ErrorBoundary>
                  <ButtonPrimary disabled={!formik.dirty} title={'Update'} />
               </ErrorBoundary>
               )}
            </View>
         </Page.Container>
      </Page>
   );
};

BillingScreen.propTypes = {
   // prop: PropTypes.string
};

BillingScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(BillingScreen);
