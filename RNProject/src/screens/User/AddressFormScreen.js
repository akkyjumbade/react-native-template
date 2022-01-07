import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { Avatar, Box, Center, Divider, HStack, List, useToast, VStack } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import Icon from '@modules/rn-kit/atoms/Icon';
import { useNavigation } from '@react-navigation/core';
import { auth_logout_action } from '@/store/auth/auth.actions';
import icons from '@/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary';
import Button from '@modules/rn-kit/atoms/Button';
import config, { APP_VERSION } from '@/config';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import useTranslation from '@/hooks/useTranslation';
import TextInput from '@modules/rn-kit/molecules/TextInput';
import FormControl from '@modules/rn-kit/molecules/FormControl';
import NumberInput from '@modules/rn-kit/molecules/NumberInput';
import { useFormik } from 'formik';
import PhoneNumberInput from '@modules/rn-kit/molecules/PhoneNumberInput';

const AddressFormScreen = ({ user, isAuthenticated, initialValues = {} }) => {
   const nav = useNavigation()
   const __ = useTranslation();
   const formik = useFormik({
      initialValues,
   })
   if (!user) {
      return null
   }

   return (
      <Page  scroll={true}>
         <Page.Container>
            <Page.Title>Address</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, paddingBottom: 160 }}>
               <VStack alignItems={'center'}>
                  <FormControl label={__('name')}>
                     <TextInput value={formik.values.name} onChange={formik.handleChange('name')} />
                  </FormControl>
                  <FormControl label={__('phone')}>
                     <PhoneNumberInput value={formik.values.phone} onChange={formik.handleChange('phone')} />
                  </FormControl>
                  <FormControl label={__('address_line')}>
                     <TextInput value={formik.values.address_line} onChange={formik.handleChange('address_line')} />
                  </FormControl>
                  <FormControl label={__('address_line_2')}>
                     <TextInput value={formik.values.address_line_2} onChange={formik.handleChange('address_line_2')} />
                  </FormControl>
                  <FormControl label={__('city')}>
                     <TextInput value={formik.values.city} onChange={formik.handleChange('city')} />
                  </FormControl>
                  <FormControl label={__('state')}>
                     <TextInput value={formik.values.state} onChange={formik.handleChange('state')} />
                  </FormControl>
                  <FormControl label={__('postal_code')}>
                     <NumberInput value={formik.values.postal_code} onChange={formik.handleChange('postal_code')} />
                  </FormControl>
               </VStack>
               <VStack space={4} style={{ marginTop: 15, marginBottom: 0, width: '100%' }}>
                  <ButtonPrimary title={__('btn_save_address')} onPress={() => formik.handleSubmit()} />
                  <Button title={__('btn_cancel')} onPress={() => nav.goBack()} />
               </VStack>
            </View>
         </Center>
      </Page>
   );
};

AddressFormScreen.propTypes = {
   // prop: PropTypes.string
};

AddressFormScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(AddressFormScreen);
