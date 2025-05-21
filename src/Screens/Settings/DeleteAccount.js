import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Left from '../../../Assets/Left.png';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import DeleteAccountStyle from './DeleteAccountStyle';
import {deleteAccount} from '../../redux/Slices/SettingsSlice';
import {useSelector, useDispatch} from 'react-redux';

const DeleteAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.settings);

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteAccount()).unwrap();
              Alert.alert('Account Deleted', 'Your account has been deleted.');
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('Error', error || 'Failed to delete account');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={DeleteAccountStyle.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0C3384" animated />
      {/* Header */}
      <View style={DeleteAccountStyle.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image
            source={Left}
            resizeMode="contain"
            style={DeleteAccountStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={DeleteAccountStyle.headerTitle}>Delete Account</Text>
      </View>

      <ScrollView>
        <View style={DeleteAccountStyle.SpacingView}>
          <View style={DeleteAccountStyle.DeleteConfirmationTextView}>
            <Text style={DeleteAccountStyle.DeleteConfirmationText}>
              Are you sure you want to delete your account? Please read how
              account deletion will affect.
            </Text>
          </View>

          <View style={DeleteAccountStyle.AccountTextView}>
            <Text style={DeleteAccountStyle.AccountText}>Account</Text>
          </View>

          <View style={DeleteAccountStyle.DeleteDetailsView}>
            <Text style={DeleteAccountStyle.DeleteDetails}>
              Deleting your account removes personal information from our
              database. Your email becomes permanently reserved and cannot be
              re-used for a new account.
            </Text>
          </View>

          <View style={DeleteAccountStyle.DeleteAccountView}>
            <TouchableOpacity
              style={DeleteAccountStyle.DeleteAccountBtn}
              onPress={handleDeleteAccount}
              disabled={loading}>
              <View style={DeleteAccountStyle.DeleteAccountBtnRow}>
                <Icon name="delete" type="feather" size={22} color="#fff" />
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={DeleteAccountStyle.DeleteAccountText}>
                    Delete Account
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {error && (
            <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteAccount;
