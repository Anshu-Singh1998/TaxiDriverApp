// __mocks__/react-native-webview.js
import React from 'react';
import { View, Text } from 'react-native';

export const WebView = (props) => {
  return (
    <View {...props}>
      <Text>Mocked WebView</Text>
    </View>
  );
};

export default WebView;
