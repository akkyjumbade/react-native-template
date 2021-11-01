import { ErrorMessage } from 'formik';
import React from 'react'
import { View } from 'react-native';
import { Text } from 'uikit'

export default class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
   }

   componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      // logErrorToMyService(error, errorInfo);
   }

   render() {
      // if (this.state.hasError) {
      //    // You can render any custom fallback UI
      //    return (
      //       <View>
      //          <Text>
   //             Something went wrong.
      //          </Text>
      //       </View>
      //    );
      // }

      return this.props.children;
   }
}
