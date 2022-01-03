import { Text } from '@modules/rn-kit/atoms';
import { View } from 'native-base';
import React from 'react'


export default class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
   }

   // componentDidCatch(error, errorInfo) {
   //    // You can also log the error to an error reporting service
   //    // logErrorToMyService(error, errorInfo);
   // }

   render() {
      if (this.state.hasError && __DEV__) {
         const { error } = this.state
         return (
            <View>
               <Text>
                  {error.message ?? 'Something went wrong.'}
               </Text>
            </View>
         );
      }

      return this.props.children;
   }
}
