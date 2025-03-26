import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  BankInfoStyleheet,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import * as React from 'react';
import {useState, useEffect} from 'react';
import Left from '../../../Assets/Left.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import BankInfoStyle from './BankInfoStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  bankInfoList,
  bankInfoStore,
  bankInfoUpdate,
} from '../../redux/Slices/BankIndoSlice';

const BankInfo = () => {
  const navigation = useNavigation();
  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIFSCCode] = useState('');
  const [modalBankName, setModalBankName] = useState('');
  const [modalAccountHolderName, setModalAccountHolderName] = useState('');
  const [modalAccountNumber, setModalAccountNumber] = useState('');
  const [modalIFSCCode, setModalIFSCCode] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {loading, error, data} = useSelector(state => state.bank);

  useEffect(() => {
    dispatch(bankInfoList()); // fetch on component mount
  }, []);

  const handleSubmit = async () => {
    if (!bankName || !accountHolderName || !accountNumber || !ifscCode) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    const payload = {
      bank_name: bankName,
      account_holder_name: accountHolderName,
      account_number: accountNumber,
      ifsc_code: ifscCode,
    };

    try {
      const result = await dispatch(bankInfoStore(payload)).unwrap();
      Alert.alert('Success', result.message || 'Bank info saved successfully');
    } catch (error) {
      console.log('Submit Error:', error);
      const errorMsg =
        error?.errors && typeof error.errors === 'object'
          ? Object.values(error.errors).flat().join('\n')
          : error?.message || 'Something went wrong';
      Alert.alert('Error', errorMsg);
    }
  };

  const handleUpdate = async () => {
    if (
      !modalBankName ||
      !modalAccountHolderName ||
      !modalAccountNumber ||
      !modalIFSCCode
    ) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    const payload = {
      id: data?.id,
      bank_name: modalBankName.trim(),
      account_holder_name: modalAccountHolderName.trim(),
      account_number: modalAccountNumber.trim(),
      ifsc_code: modalIFSCCode.trim(),
    };

    try {
      const result = await dispatch(bankInfoUpdate(payload)).unwrap();

      Alert.alert(
        'Success',
        result?.message || 'Bank information updated successfully',
      );

      setModalVisible(false);
      dispatch(bankInfoList()); // Refresh the list after update

      // Clear main form fields
      setBankName('');
      setAccountHolderName('');
      setAccountNumber('');
      setIFSCCode('');
    } catch (error) {
      let errorMsg = 'Something went wrong';

      if (error?.errors && typeof error.errors === 'object') {
        errorMsg = Object.values(error.errors).flat().join('\n');
      } else if (typeof error === 'string') {
        errorMsg = error;
      } else if (error?.message) {
        errorMsg = error.message;
      }

      Alert.alert('Error', errorMsg);
    }
  };

  const handleEdit = () => {
    setModalBankName(data?.bank_name || '');
    setModalAccountHolderName(data?.account_holder_name || '');
    setModalAccountNumber(data?.account_number || '');
    setModalIFSCCode(data?.ifsc_code || '');
    setModalVisible(true);
  };

  return (
    <View style={BankInfoStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      {/* Header */}
      <View style={BankInfoStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Left}
            resizeMode="contain"
            style={BankInfoStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={BankInfoStyle.headerTitle}>Bank Info</Text>
      </View>

      {/* Password Fields */}
      <View style={BankInfoStyle.passwordWrapper}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>
            Error:{' '}
            {typeof error === 'string'
              ? error
              : error?.message || JSON.stringify(error)}
          </Text>
        ) : data ? (
          <View style={BankInfoStyle.card}>
            <View>
              <Text>Account Holder Name: {data.account_holder_name}</Text>
              <Text>Bank Name: {data.bank_name}</Text>
              <Text>Account Number: {data.account_number}</Text>
              <Text>IFSC Code: {data.ifsc_code}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={handleEdit}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text>No Data Found</Text>
        )}

        <View>
          <View style={BankInfoStyle.passwordCell}>
            <TextInput
              style={BankInfoStyle.passwordInput}
              placeholder="Bank Name"
              value={bankName}
              onChangeText={setBankName}
            />
          </View>
          <View style={BankInfoStyle.passwordCell}>
            <TextInput
              style={BankInfoStyle.passwordInput}
              placeholder="Account Holder Name"
              value={accountHolderName}
              onChangeText={setAccountHolderName}
            />
          </View>
          <View style={BankInfoStyle.passwordCell}>
            <TextInput
              style={BankInfoStyle.passwordInput}
              placeholder="Account Number"
              keyboardType="number-pad"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>
          <View style={BankInfoStyle.passwordCell}>
            <TextInput
              style={BankInfoStyle.passwordInput}
              placeholder="IFSC Code"
              value={ifscCode}
              onChangeText={setIFSCCode}
            />
          </View>
        </View>
      </View>

      {/* Save Button Fixed at Bottom */}
      <TouchableOpacity
        style={BankInfoStyle.loginButton}
        onPress={handleSubmit}>
        <Text style={BankInfoStyle.loginButtonText}>Save</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={BankInfoStyle.modalContainer}>
          <View style={BankInfoStyle.modalContent}>
            <View>
              <View>
                <TextInput
                  style={BankInfoStyle.passwordInput}
                  placeholder="Bank Name"
                  value={modalBankName}
                  onChangeText={setModalBankName}
                />
              </View>
              <View>
                <TextInput
                  style={BankInfoStyle.passwordInput}
                  placeholder="Account Holder Name"
                  value={modalAccountHolderName}
                  onChangeText={setModalAccountHolderName}
                />
              </View>
              <View>
                <TextInput
                  style={BankInfoStyle.passwordInput}
                  placeholder="Account Number"
                  keyboardType="number-pad"
                  value={modalAccountNumber}
                  onChangeText={setModalAccountNumber}
                />
              </View>
              <View>
                <TextInput
                  style={BankInfoStyle.passwordInput}
                  placeholder="IFSC Code"
                  value={modalIFSCCode}
                  onChangeText={setModalIFSCCode}
                />
              </View>
              <View style={{paddingTop: responsiveScreenHeight(30)}}>
                <TouchableOpacity
                  style={BankInfoStyle.loginButton}
                  onPress={handleUpdate}>
                  <Text style={BankInfoStyle.loginButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BankInfo;
