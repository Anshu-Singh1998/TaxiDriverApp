import * as React from 'react';
import { useState,useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import Contacts from 'react-native-contacts';
import Left from '../../../Assets/Left.png';
import EmergencyContactsStyle from './EmergencyContactsStyle';
import {useNavigation} from '@react-navigation/native';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  // Request permissions for reading contacts
  const requestContactPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Fetch Contacts
  const fetchContacts = async () => {
    const hasPermission = await requestContactPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Please enable contacts permission in settings.',
      );
      return;
    }

    Contacts.getAll()
      .then(contactList => {
        setContacts(contactList);
      })
      .catch(err => {
        console.warn('Error fetching contacts:', err);
      });
  };

  // Open Device Contact App for Adding a Contact

  const openAddContact = () => {
    const newContact = {
      givenName: '',
      phoneNumbers: [{label: 'mobile', number: ''}],
    };

    Contacts.openContactForm(newContact)
      .then(contact => {
        if (contact) {
          fetchContacts();
        }
      })
      .catch(err => {
        console.warn('Error opening contact form:', err);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <View style={EmergencyContactsStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />

      <View style={EmergencyContactsStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={EmergencyContactsStyle.backIcon} />
        </TouchableOpacity>
        <Text style={EmergencyContactsStyle.headerTitle}>Emergency Contacts</Text>
      </View>
      {contacts.length === 0 ? (
        <Text style={EmergencyContactsStyle.NoContactsText}>No contacts found.</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={item => item.recordID}
          renderItem={({item}) => (
            <View style={EmergencyContactsStyle.NumberListView}>
              <Text style={EmergencyContactsStyle.phoneNumberName}>
                {item.givenName} {item.familyName}
              </Text>
              {item.phoneNumbers.length > 0 && (
                <Text style={EmergencyContactsStyle.phoneNumber}>
                  {item.phoneNumbers[0].number}
                </Text>
              )}
            </View>
          )}
        />
      )}
      <View style={EmergencyContactsStyle.AddContactBtnView}>
        <TouchableOpacity style={EmergencyContactsStyle.AddContactBtn} onPress={openAddContact}>
          <Text style={EmergencyContactsStyle.AddContactText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default EmergencyContacts;
