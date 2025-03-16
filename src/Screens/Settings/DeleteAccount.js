
import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  DeleteAccountStyleheet,
  TextInput,
  ScrollView,
} from 'react-native';
import Left from '../../../Assets/Left.png';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import DeleteAccountStyle from './DeleteAccountStyle';

const DeleteAccount = () => {
  const navigation = useNavigation();


  return (
    <View style={DeleteAccountStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      {/* Header */}
      <View style={DeleteAccountStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={DeleteAccountStyle.backIcon} />
        </TouchableOpacity>
        <Text style={DeleteAccountStyle.headerTitle}>Delete Account</Text>
      </View>
      <ScrollView>
        <View style={DeleteAccountStyle.SpacingView}>
          <View style={DeleteAccountStyle.DeleteConfirmationTextView}>
            <Text style={DeleteAccountStyle.DeleteConfirmationText}>
              Are You sure you want to delete your account? Please read how
              account deletion will affect.
            </Text>
          </View>
          <View style={DeleteAccountStyle.AccountTextView}>
            <Text style={DeleteAccountStyle.AccountText}>Account</Text>
          </View>
          <View style={DeleteAccountStyle.DeleteDetailsView}>
            <Text style={DeleteAccountStyle.DeleteDetails}>
              Deleting your account remove personal information from our
              database. Your email becomes permanently reserved and same email
              cannot be re-used to register a new account.
            </Text>
          </View>
          <View style={DeleteAccountStyle.DeleteAccountView}>
            <TouchableOpacity style={DeleteAccountStyle.DeleteAccountBtn}>
              <View style={DeleteAccountStyle.DeleteAccountBtnRow}>
                <Icon name="delete" type="feather" size={22} color="#fff" />
                <Text style={DeleteAccountStyle.DeleteAccountText}>Delete Account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};



export default DeleteAccount;
