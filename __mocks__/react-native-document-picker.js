// __mocks__/react-native-document-picker.js
const DocumentPicker = {
    pick: jest.fn(() => Promise.resolve(/* your mock response object */)),
    pickMultiple: jest.fn(() => Promise.resolve(/* your mock responses array */)),
    types: {
      allFiles: '*/*',
      plainText: 'text/plain',
      // add other types as needed
    },
    // Include any additional methods or properties your app requires
  };
  
  module.exports = DocumentPicker;
  