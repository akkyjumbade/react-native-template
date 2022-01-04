import Text from '@modules/rn-kit/atoms/Text';
import FormControl from '@modules/rn-kit/molecules/FormControl';
import TextInput from '@modules/rn-kit/molecules/TextInput';
// import TextInput from '@modules/rn-kit/molecules/TextInput'
import React from 'react';
import {useFormik} from 'formik';
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary';
import {useNavigation} from '@react-navigation/core';
import useTranslation from '@/hooks/useTranslation';
import {useAuthentication} from "@/providers/AuthenticationContextProvider";
import { View } from "react-native";
import ButtonOutline from "@modules/rn-kit/atoms/ButtonOutline";
import Button from "@modules/rn-kit/atoms/Button";
import ErrorBoundary from '../errors/ErrorBoundary';

const PasswordChangeForm = ({initialValues = {}}) => {
   const nav = useNavigation();
   const __ = useTranslation();
   const onSubmit = async values => {
      // return await http()
   };
   const formik = useFormik({
      initialValues,
      // onSubmit:
   });
   return (
      <ErrorBoundary>
         <FormControl label={__('OTP Sent on email')}>
            <TextInput
               values={formik.values.otp}
               onChangeText={formik.handleChange('otp')}
            />
         </FormControl>
         <FormControl label={__('Password')}>
            <TextInput
               values={formik.values.password}
               onChangeText={formik.handleChange('password')}
            />
         </FormControl>
         <ButtonPrimary title={__('btn_change_password')} onPress={() => nav.navigate('home')} />
         {/* <View style={{ marginTop: 15, }}>
            <ButtonOutline title={__('btn_cancel')} onPress={() => nav.goBack()} />
         </View> */}
      </ErrorBoundary>
   );
};

export default PasswordChangeForm;
