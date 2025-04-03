import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Modal,
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import RightArrow from '../../../Assets/RightArrow.png';
import Left from '../../../Assets/Left.png';
import AvailableImg from '../../../Assets/Available.png';
import LanguageImg from '../../../Assets/Language.png';
import DeleteAccountImg from '../../../Assets/DeleteAccount.png';
import ChangePasswordImg from '../../../Assets/ChangePassword.png';
import PrivacyPolicyImg from '../../../Assets/PrivacyPolicy.png';
import TermsAndConditionsImg from '../../../Assets/TermsAndConditions.png';
import AboutUsImg from '../../../Assets/AboutUs.png';
import Tick from '../../../Assets/Tick.png';
import BasicTick from '../../../Assets/BasicTick.png';
import Cross from '../../../Assets/Cross.png';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/Slices/SettingsSlice';

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    setModalVisible(true);
  };

  const handleYes = () => {
    setIsEnabled(prev => !prev);
    setModalVisible(false);
    dispatch(logout());
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View
        style={{
          paddingTop: responsiveScreenHeight(3),
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: responsiveScreenWidth(5),
              paddingRight: responsiveScreenWidth(5),
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <View style={styles.iconOutline}>
                <Image
                  source={ChangePasswordImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  paddingLeft: responsiveScreenWidth(2),
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: responsiveScreenFontSize(2),
                    lineHeight: 30,
                    color: '#000',
                  }}>
                  Change Password
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={RightArrow}
                style={{
                  height: responsiveScreenHeight(6),
                  width: responsiveScreenWidth(4),
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: responsiveScreenHeight(2),
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Language')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: responsiveScreenWidth(5),
              paddingRight: responsiveScreenWidth(5),
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <View style={styles.iconOutline}>
                <Image
                  source={LanguageImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  paddingLeft: responsiveScreenWidth(2),
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: responsiveScreenFontSize(2),
                    lineHeight: 30,
                    color: '#000',
                  }}>
                  Language
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={RightArrow}
                style={{
                  height: responsiveScreenHeight(6),
                  width: responsiveScreenWidth(4),
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: responsiveScreenHeight(2),
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: responsiveScreenWidth(5),
              paddingRight: responsiveScreenWidth(5),
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <View style={styles.iconOutline}>
                <Image
                  source={PrivacyPolicyImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  paddingLeft: responsiveScreenWidth(2),
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: responsiveScreenFontSize(2),
                    lineHeight: 30,
                    color: '#000',
                  }}>
                  Privacy Policy
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={RightArrow}
                style={{
                  height: responsiveScreenHeight(6),
                  width: responsiveScreenWidth(4),
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: responsiveScreenHeight(2),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TermsAndConditions')}>
          <View style={styles.TermsAndConditionsBtn}>
            <View style={styles.TermsAndConditionsRow}>
              <View style={styles.iconOutline}>
                <Image
                  source={TermsAndConditionsImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.TermsAndConditionsTextView}>
                <Text style={styles.TermsAndConditionsText}>
                  Terms & Conditions
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={RightArrow}
                style={styles.TermsAndConditionsRightArrowImg}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.AboutUsBtnView}>
        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
          <View style={styles.AboutUsBtn}>
            <View style={styles.AboutUsIconTextView}>
              <View style={styles.iconOutline}>
                <Image
                  source={AboutUsImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.AboutUsTextView}>
                <Text style={styles.AboutUsText}>About Us</Text>
              </View>
            </View>
            <View>
              <Image
                source={RightArrow}
                style={styles.AboutUsRightArrowImg}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.DeleteBtnView}>
        <TouchableOpacity onPress={() => navigation.navigate('DeleteAccount')}>
          <View style={styles.DeleteRowView}>
            <View style={styles.DeleteTextImgView}>
              <View style={styles.iconOutline}>
                <Image
                  source={DeleteAccountImg}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.DeleteAccountTextView}>
                <Text style={styles.DeleteAccountText}>Delete Account</Text>
              </View>
            </View>
            <View>
              <Image
                source={RightArrow}
                style={styles.RightArrowImg}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.ModalView}>
        <View style={styles.OutlineRowView}>
          <View style={styles.OutLineView}>
            <View style={styles.iconOutline}>
              <Image
                source={AvailableImg}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.AvailabilityView}>
              {isEnabled ? (
                <Text style={styles.AvailableText}>Available</Text>
              ) : (
                <Text style={styles.NotAvailableText}>Not Available</Text>
              )}
            </View>
          </View>
          <View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#0C3384' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
            />
          </View>
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* Top Blue Section */}
                <View style={styles.blueSection}>
                  <View style={styles.TickImgView}>
                    <Image
                      source={Tick}
                      style={styles.TickImg}
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View style={styles.whiteSection}>
                  <Text style={styles.modalText}>
                    You will not receive new riders and notifications
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.noButton}
                      onPress={() => setModalVisible(false)}>
                      <Image
                        source={Cross}
                        style={styles.CrossImg}
                        resizeMode="contain"
                      />
                      <Text style={styles.noText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.yesButton}
                      onPress={handleYes}>
                      <Image
                        source={BasicTick}
                        style={styles.BasicTickImg}
                        resizeMode="contain"
                      />
                      <Text style={styles.yesText}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(6),
  },
  iconOutline: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(8),
    borderRadius: responsiveScreenWidth(2),
    borderWidth: 1,
    borderColor: '#0C3384',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '30%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  blueSection: {
    flex: 1,
    backgroundColor: '#0C3384',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteSection: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  noButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
  },
  yesButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noText: {
    color: '#0C3384',
    fontWeight: '600',
    paddingLeft: responsiveScreenWidth(1),
  },
  yesText: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: responsiveScreenWidth(1),
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
  },
  backIcon: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(12),
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 40,
    color: '#FFF',
    marginLeft: responsiveScreenWidth(5),
  },
  BasicTickImg: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(6),
    tintColor: '#fff',
  },
  CrossImg: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(6),
  },
  TickImg: {
    height: responsiveScreenHeight(8),
    width: responsiveScreenWidth(12),
  },
  TickImgView: {
    height: responsiveScreenHeight(8),
    width: responsiveScreenHeight(8),
    borderRadius: responsiveScreenHeight(4),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NotAvailableText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  AvailableText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  AvailabilityView: {
    paddingLeft: responsiveScreenWidth(2),
  },
  OutLineView: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  OutlineRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: responsiveScreenWidth(5),
    paddingRight: responsiveScreenWidth(5),
  },
  ModalView: {
    paddingTop: responsiveScreenHeight(2),
  },
  RightArrowImg: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(4),
  },
  DeleteAccountText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  DeleteAccountTextView: {
    paddingLeft: responsiveScreenWidth(2),
  },
  DeleteTextImgView: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  DeleteRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: responsiveScreenWidth(5),
    paddingRight: responsiveScreenWidth(5),
  },
  DeleteBtnView: {
    paddingTop: responsiveScreenHeight(2),
  },
  AboutUsRightArrowImg: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(4),
  },
  AboutUsText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  AboutUsTextView: {
    paddingLeft: responsiveScreenWidth(2),
  },
  AboutUsIconTextView: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  AboutUsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: responsiveScreenWidth(5),
    paddingRight: responsiveScreenWidth(5),
  },
  AboutUsBtnView: {
    paddingTop: responsiveScreenHeight(2),
  },
  TermsAndConditionsRightArrowImg: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(4),
  },
  TermsAndConditionsText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  TermsAndConditionsTextView: {
    paddingLeft: responsiveScreenWidth(2),
  },
  TermsAndConditionsRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  TermsAndConditionsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: responsiveScreenWidth(5),
    paddingRight: responsiveScreenWidth(5),
  },
});
export default Settings;
