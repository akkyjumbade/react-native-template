import React, { Fragment } from 'react'
import { Pressable, View } from 'react-native'
import { useSelector } from 'react-redux'
import Page from "@modules/rn-kit/layouts/Page";
import Text from "@modules/rn-kit/atoms/Text";
import useTranslation from "@/hooks/useTranslation";
import { useLocale } from '@/providers/LocaleProvider';
import { Center, HStack, Skeleton, Spinner, VStack } from 'native-base';

const Example2 = () => {
   return <HStack space={8} justifyContent="center">
       <Spinner size="lg"  color="emerald.500" />
       <Spinner size="lg"  color="warning.500" />
       <Spinner size="lg"  color="indigo.500" />
       <Spinner size="lg"  color="cyan.500" />
     </HStack>;
 };

const Example = () => {
   return (
      <Center w="100%" my="13">
         <VStack w="100%" space={6} rounded="md" alignItems="center">
            <Skeleton h="40" w="100%" />
            {/* <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-70" /> */}
            <HStack space="2">
               <Skeleton size="5" rounded="full" />
               <Skeleton size="5" rounded="full" />
               <Skeleton size="5" rounded="full" />
               <Skeleton size="5" rounded="full" />
               <Skeleton size="5" rounded="full" />
            </HStack>
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton mb="3" w="40" rounded="20" />
         </VStack>
      </Center>
   );
};

const HomeScreen = ({ navigation }) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   const locale = useLocale()
   const options = useSelector(({ options }) => (options))
   return (
      <Page scroll={true}>
         <Page.Container>
            <Example />
            <Example2 size="lg" />
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
