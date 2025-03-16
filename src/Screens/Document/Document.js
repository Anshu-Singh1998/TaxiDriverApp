import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  DocumentStyleheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Left from '../../../Assets/Left.png';
import DocumentStyle from './DocumentStyle';
import {launchDocumentLibrary} from 'react-native-image-picker';

const Document = () => {
  const [fileName, setFileName] = useState('');
  const navigation = useNavigation();

  const pickDocument = async () => {
    try {
      const result = await launchDocumentLibrary({
        mediaType: 'mixed', // Supports images, videos, and documents
      });

      if (!result.didCancel && result.assets?.length > 0) {
        console.log(result.assets);
        setFileName(result.assets[0]?.fileName || 'Unknown File');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong while picking the document.');
    }
  };

  return (
    <View style={DocumentStyle.MainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" animated />
      <View style={DocumentStyle.header}>
        <TouchableOpacity
          style={DocumentStyle.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={DocumentStyle.backIcon} />
        </TouchableOpacity>
        <Text style={DocumentStyle.headerTitle}>OutStation Upcoming Rides</Text>
      </View>
      <TouchableOpacity onPress={pickDocument}>
        <TextInput
          value={fileName}
          placeholder="Select a document"
          editable={false} // Prevent manual input
          style={DocumentStyle.input}
        />
      </TouchableOpacity>
    </View>
  );
};



export default Document;
