import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import useNotificationsQuery from '@/api/useNotificationsQuery';
import { Center, FlatList } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import Empty from '@/components/Empty';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useTranslation from '@/hooks/useTranslation';

const NotificationItem = ({ item }) => {
   const { data = {} } = item
   return (
      <View>
         <Text bold>{data.title}</Text>
         <Text>{data.body}</Text>
      </View>
   )
}

const RewardsScreen = ({ user }) => {
   const __ = useTranslation();
   const nav = useNavigation()
   const { data: { data: notifications } = { }, isLoading, } = useNotificationsQuery()
   function onItemClick(item) {
      nav.navigate('rewards.show', {
         notification: item
      })
   }
   return (
      <Page scroll={false} >
         <Page.Container>
            <Page.Title>{__('Rewards')}</Page.Title>
            <FlatList
               data={notifications?.data}
               ListEmptyComponent={() => (
                  <Center flex={1} flexGrow={1}>
                     <Empty
                        iconName={'bell'}
                        title={'No rewards'} />
                  </Center>
               )}
               renderItem={({ item }) => (
                  <TouchableOpacity key={`notification_${item.id}`} onPress={() => onItemClick(item)}>
                     <NotificationItem item={item} />
                  </TouchableOpacity>
               )}
            />
         </Page.Container>
      </Page>
   );
};

RewardsScreen.propTypes = {
   // prop: PropTypes.string
};

RewardsScreen.defaultProps = {};

export default connect(state => ({
   user: state.auth.user
}))(RewardsScreen);
