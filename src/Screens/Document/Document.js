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
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Left from '../../../Assets/Left.png';
import DocumentStyle from './DocumentStyle';
import DocumentPicker from 'react-native-document-picker';
import {WebView} from 'react-native-webview';
import {
  documentList,
  documentShow,
  documentSave,
  documentDownload,
} from '../../redux/Slices/DocumentSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';

const Document = () => {
  const [rcFileName, setRCFileName] = useState('');
  const [roadTaxFileName, setRoadTaxFileName] = useState('');
  const [permitFileName, setPermitFileName] = useState('');
  const [driverLicenseFileName, setDriverLicenseFileName] = useState('');
  const [driverBatchFileName, setDriverBatchFileName] = useState('');
  const [rcDocument, setRCDocument] = useState(null);
  const [roadTaxDocument, setRoadTaxDocument] = useState(null);
  const [permitDocument, setPermitDocument] = useState(null);
  const [driverLicenseDocument, setDriverLicenseDocument] = useState(null);
  const [driverBatchDocument, setDriverBatchDocument] = useState(null);

  const [selectedRCDocumentUrl, setSelectedRCDocumentUrl] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.document);

  console.log('Redux State Data:', data);

  useEffect(() => {
    dispatch(documentList()); // Fetch documents on mount
    dispatch(documentShow());
  }, [dispatch]);

  const secondObject = data?.[1]?.data || null;
  // console.log("Second Object:", secondObject);
  const documents = secondObject ? [secondObject] : [];

  const renderItem = ({item}) => {
    // console.log("Itemsss====>>>",item)
    return (
      <TouchableOpacity
        style={DocumentStyle.listItem}
        onPress={() => navigation.navigate('DocumentViewer', {url: item.url})}>
        <Text style={DocumentStyle.listItemText}>
          {item.file_name || 'Unknown File'}
        </Text>
      </TouchableOpacity>
    );
  };

  const pickRCDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images], // pdf, jpg, png
      });
      setRCFileName(result.name || 'Unknown File');
      setRCDocument(result); // save full file object
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while picking the document.',
        );
      }
    }
  };

  const pickRoadTaxDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images], // pdf, jpg, png
      });
      setRoadTaxFileName(result.name || 'Unknown File');
      setRoadTaxDocument(result); // save full file object
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while picking the document.',
        );
      }
    }
  };

  const pickPermitDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images], // pdf, jpg, png
      });
      setPermitFileName(result.name || 'Unknown File');
      setPermitDocument(result); // save full file object
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while picking the document.',
        );
      }
    }
  };

  const pickDriverLicenseDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images], // pdf, jpg, png
      });
      setDriverLicenseFileName(result.name || 'Unknown File');
      setDriverLicenseDocument(result); // save full file object
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while picking the document.',
        );
      }
    }
  };

  const pickDriverBatchDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images], // pdf, jpg, png
      });
      setDriverBatchFileName(result.name || 'Unknown File');
      setDriverBatchDocument(result); // save full file object
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while picking the document.',
        );
      }
    }
  };

  const handleSaveDocuments = async () => {
    if (
      !rcDocument ||
      !roadTaxDocument ||
      !permitDocument ||
      !driverLicenseDocument ||
      !driverBatchDocument
    ) {
      Alert.alert('Missing', 'Please select all documents before saving.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('rc_book', {
        uri: rcDocument.uri,
        type: rcDocument.type,
        name: rcDocument.name,
      });
      formData.append('road_tax', {
        uri: roadTaxDocument.uri,
        type: roadTaxDocument.type,
        name: roadTaxDocument.name,
      });
      formData.append('driving_licence', {
        uri: driverLicenseDocument.uri,
        type: driverLicenseDocument.type,
        name: driverLicenseDocument.name,
      });
      formData.append('permit', {
        uri: permitDocument.uri,
        type: permitDocument.type,
        name: permitDocument.name,
      });
      formData.append('drivers_batch', {
        uri: driverBatchDocument.uri,
        type: driverBatchDocument.type,
        name: driverBatchDocument.name,
      });

      await dispatch(documentSave(formData)).unwrap();
      Alert.alert('Success', 'Documents saved successfully.');

      setRCFileName('');
      setRoadTaxFileName('');
      setPermitFileName('');
      setDriverLicenseFileName('');
      setDriverBatchFileName('');

      setRCDocument(null);
      setRoadTaxDocument(null);
      setPermitDocument(null);
      setDriverLicenseDocument(null);
      setDriverBatchDocument(null);
    } catch (error) {
      console.log('Save Error:', error);
      Alert.alert('Error', 'Failed to save documents.');
    }
  };

  return (
    <View style={DocumentStyle.MainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" animated />
      <View style={DocumentStyle.header}>
        <TouchableOpacity
          style={DocumentStyle.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={Left}
            resizeMode="contain"
            style={DocumentStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={DocumentStyle.headerTitle}>Document</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: responsiveScreenHeight(4),
          paddingBottom: responsiveScreenHeight(4),
        }}>
        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{marginTop: 20}}
          />
        ) : (
          // Document List
          <FlatList
            data={documents}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={DocumentStyle.listContainer}
          />
        )}
        {/* WebView to show selected document */}
        {selectedRCDocumentUrl && (
          <View style={{height: Dimensions.get('window').height * 0.6}}>
            <WebView
              source={{
                uri: `https://docs.google.com/gview?embedded=true&url=${selectedRCDocumentUrl}`,
              }}
              style={{flex: 1}}
              startInLoadingState={true}
              renderLoading={() => (
                <ActivityIndicator
                  size="large"
                  color="blue"
                  style={{marginTop: 20}}
                />
              )}
            />
          </View>
        )}
      </View>
      <View
        style={{
          width: responsiveScreenWidth(100),

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={pickRCDocument}>
          <TextInput
            value={rcFileName}
            placeholder="Select RC Book document"
            editable={false} // Prevent manual input
            style={DocumentStyle.input}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: responsiveScreenWidth(100),
          paddingTop:responsiveScreenHeight(2),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={pickRoadTaxDocument}>
          <TextInput
            value={roadTaxFileName}
            placeholder="Select Road Tax document"
            editable={false} // Prevent manual input
            style={DocumentStyle.input}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: responsiveScreenWidth(100),
          paddingTop:responsiveScreenHeight(2),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={pickPermitDocument}>
          <TextInput
            value={permitFileName}
            placeholder="Select Driving License document"
            editable={false} // Prevent manual input
            style={DocumentStyle.input}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: responsiveScreenWidth(100),
          paddingTop:responsiveScreenHeight(2),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={pickDriverLicenseDocument}>
          <TextInput
            value={driverLicenseFileName}
            placeholder="Select Permit document"
            editable={false} // Prevent manual input
            style={DocumentStyle.input}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: responsiveScreenWidth(100),
paddingTop:responsiveScreenHeight(2),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={pickDriverBatchDocument}>
          <TextInput
            value={driverBatchFileName}
            placeholder="Select Driver Batch document"
            editable={false} // Prevent manual input
            style={DocumentStyle.input}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: responsiveScreenWidth(100),

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={DocumentStyle.saveButton}
          onPress={handleSaveDocuments}>
          <Text style={DocumentStyle.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Document;
