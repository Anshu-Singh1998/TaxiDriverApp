import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ChangePasswordStyleheet,
    TextInput,
  } from 'react-native';
  import * as React from 'react';
  import {useState} from 'react';
  import Left from '../../../Assets/Left.png';
  import {useNavigation} from '@react-navigation/native';
  import {Icon} from '@rneui/themed';
  import ChangePasswordStyle from './ChangePasswordStyle';
  
  const ChangePassword = () => {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    return (
      <View style={ChangePasswordStyle.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0C3384"
          animated={true}
        />
        {/* Header */}
        <View style={ChangePasswordStyle.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Left} resizeMode="contain" style={ChangePasswordStyle.backIcon} />
          </TouchableOpacity>
          <Text style={ChangePasswordStyle.headerTitle}>Change Password</Text>
        </View>
  
        {/* Password Fields */}
        <View style={ChangePasswordStyle.passwordWrapper}>
          {['Old Password', 'New Password', 'Confirm Password'].map(
            (placeholder, index) => (
              <View key={index} style={ChangePasswordStyle.passwordCell}>
                <View style={ChangePasswordStyle.passwordContainer}>
                  <TextInput
                    style={ChangePasswordStyle.passwordInput}
                    placeholder={placeholder}
                    secureTextEntry={!passwordVisible}
                    placeholderTextColor="#000"
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Icon
                      name={passwordVisible ? 'eye' : 'eye-off'}
                      type="feather"
                      size={22}
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ),
          )}
        </View>
  
        {/* Save Button Fixed at Bottom */}
        <TouchableOpacity style={ChangePasswordStyle.loginButton}>
          <Text style={ChangePasswordStyle.loginButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  
  export default ChangePassword;
  