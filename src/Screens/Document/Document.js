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
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';

const Document = () => {
  const [fileName, setFileName] = useState('');
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);

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

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles], // Supports all file types
      });

      // console.log(result);
      setFileName(result.name || 'Unknown File');
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
        {selectedDocumentUrl && (
          <View style={{height: Dimensions.get('window').height * 0.6}}>
            <WebView
              source={{
                uri: `https://docs.google.com/gview?embedded=true&url=${selectedDocumentUrl}`,
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
    </View>
  );
};

export default Document;
