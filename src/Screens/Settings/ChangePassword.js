import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import {changePassword} from '../../redux/Slices/SettingsSlice'; // Adjust the path as per your project structure
import ChangePasswordStyle from './ChangePasswordStyle';
import Left from '../../../Assets/Left.png';

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Password Fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility Toggles
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Handle Password Change Request
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('All fields are required!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New Password and Confirm Password do not match!');
      return;
    }

    const payload = {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    };
    dispatch(changePassword(payload))
      .unwrap()
      .then(response => {
        alert(response.message || 'Password changed successfully!');
        navigation.goBack();
      })
      .catch(error => {
        alert(error || 'Password change failed. Please try again.');
      });
  };

  return (
    <View style={ChangePasswordStyle.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0C3384" animated />

      {/* Header */}
      <View style={ChangePasswordStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Left}
            resizeMode="contain"
            style={ChangePasswordStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={ChangePasswordStyle.headerTitle}>Change Password</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* Old Password Field */}
        <View style={ChangePasswordStyle.passwordCell}>
          <View style={ChangePasswordStyle.passwordContainer}>
            <TextInput
              style={ChangePasswordStyle.passwordInput}
              placeholder="Old Password"
              secureTextEntry={!oldPasswordVisible}
              placeholderTextColor="#000"
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity
              onPress={() => setOldPasswordVisible(!oldPasswordVisible)}>
              <Icon
                name={oldPasswordVisible ? 'eye' : 'eye-off'}
                type="feather"
                size={22}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* New Password Field */}
        <View style={ChangePasswordStyle.passwordCell}>
          <View style={ChangePasswordStyle.passwordContainer}>
            <TextInput
              style={ChangePasswordStyle.passwordInput}
              placeholder="New Password"
              secureTextEntry={!newPasswordVisible}
              placeholderTextColor="#000"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
              <Icon
                name={newPasswordVisible ? 'eye' : 'eye-off'}
                type="feather"
                size={22}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Confirm Password Field */}
        <View style={ChangePasswordStyle.passwordCell}>
          <View style={ChangePasswordStyle.passwordContainer}>
            <TextInput
              style={ChangePasswordStyle.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              placeholderTextColor="#000"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }>
              <Icon
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                type="feather"
                size={22}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Save Button */}
        <TouchableOpacity
          style={ChangePasswordStyle.loginButton}
          onPress={handleChangePassword}>
          <Text style={ChangePasswordStyle.loginButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
