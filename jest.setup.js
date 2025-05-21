

jest.mock('@react-navigation/elements/lib/commonjs/assets/back-icon.png', () => '');
jest.mock('react-native-gesture-handler', () => {
    return {
      Swipeable: jest.fn(),
      DrawerLayout: jest.fn(),
      State: {},
      PanGestureHandler: jest.fn(),
      TapGestureHandler: jest.fn(),
      LongPressGestureHandler: jest.fn(),
      FlingGestureHandler: jest.fn(),
      ForceTouchGestureHandler: jest.fn(),
      Directions: {},
      GestureHandlerRootView: ({ children }) => children,
    };
  });

  // jest.setup.js

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-document-picker');
jest.mock('react-native-webview');
jest.mock('react-native-pdf');
jest.mock('react-native-blob-util');

