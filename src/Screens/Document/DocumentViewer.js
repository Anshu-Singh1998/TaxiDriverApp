import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Left from '../../../Assets/Left.png';
import DocumentStyle from './DocumentStyle';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {WebView} from 'react-native-webview';
import Pdf from 'react-native-pdf';

const DocumentViewer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {url} = route.params;
  // console.log('url=====>>>', url);

  return (
    <View style={{flex: 1}}>
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
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>Your PDF got downloaded .</Text>
      </View>
      <View>
        <Text>
          Please check your device downloads or notifications to find the file.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: url,
            // headers: {
            //   Authorization: `Bearer tDznqRZIzxlxp7FsYtwWlqnFEmlsAHo0LAENFS6Kec63e6ae`,
            //   Accept: 'application/pdf',
            // },
          }}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            // backgroundColor:"red"
          }}
        />
        {/* <Pdf
          source={{uri: url}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default DocumentViewer;
