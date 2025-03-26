import * as React from 'react';
import {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  contactList,
  contactStore,
  contactDelete,
} from '../../redux/Slices/ContactSlice';

const EmergencyContacts = () => {
  const [contact, setContacts] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const contacts = useSelector(state => state.contact.data); // Fetching contacts from Redux
  const loading = useSelector(state => state.contact.loading);
  const error = useSelector(state => state.contact.error);

  useEffect(() => {
    dispatch(contactList()); // Fetch contacts when the component mounts
  }, [dispatch]);

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
          // Extract name and phone number
          const name =
            contact.givenName +
            (contact.familyName ? ` ${contact.familyName}` : '');
          const phone_number = contact.phoneNumbers[0]?.number || '';

          if (name && phone_number) {
            // Dispatch action to store contact in API
            dispatch(contactStore({name, phone_number}));
          }
        }
      })
      .catch(err => {
        console.warn('Error opening contact form:', err);
      });
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDeleteContact = id => {
    dispatch(contactDelete(id));
  };

  return (
    <View style={EmergencyContactsStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />

      <View style={EmergencyContactsStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Left}
            resizeMode="contain"
            style={EmergencyContactsStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={EmergencyContactsStyle.headerTitle}>
          Emergency Contacts
        </Text>
      </View>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{color: 'red'}}>{error}</Text>}

      {contacts.length === 0 ? (
        <Text>No contacts found.</Text>
      ) : (
        <FlatList
          data={contacts} // Now using Redux state
          keyExtractor={item =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          renderItem={({item}) => (
            <View style={EmergencyContactsStyle.NumberListView}>
              <Text>{item.name}</Text>
              <Text>{item.phone_number}</Text>
              <TouchableOpacity
                onPress={() => dispatch(contactDelete(item.id))}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <View style={EmergencyContactsStyle.AddContactBtnView}>
        <TouchableOpacity
          style={EmergencyContactsStyle.AddContactBtn}
          onPress={openAddContact}>
          <Text style={EmergencyContactsStyle.AddContactText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmergencyContacts;
