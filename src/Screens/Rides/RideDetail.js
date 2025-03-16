import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  RideDetailStyleheet,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import RightArrow from '../../../Assets/RightArrow.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Calender from '../../../Assets/Calender.png';
import Compass from '../../../Assets/Compass.png';
import Destination from '../../../Assets/Destination.png';
import RideDetailStyle from './RideDetailStyle';

const RideDetail = () => {
  return (
    <View style={RideDetailStyle.MainContainer}>
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0C3384"
          animated={true}
        />
        <View style={RideDetailStyle.header}>
          <TouchableOpacity
            style={RideDetailStyle.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={Left}
              resizeMode="contain"
              style={RideDetailStyle.backIcon}
            />
          </TouchableOpacity>
          <Text style={RideDetailStyle.headerTitle}>Ride Detail</Text>
        </View>
        <ScrollView>
          <View style={RideDetailStyle.Spacio}>
            <View>
              <View style={RideDetailStyle.RideDetailsRowViewSpace}>
                <View style={RideDetailStyle.RideDetailsRowView}>
                  <View style={RideDetailStyle.RideDetailBox}>
                    <View style={RideDetailStyle.CalenderDateTimeRow}>
                      <View style={RideDetailStyle.CalenderDateTime}>
                        <View>
                          <Image
                            source={Calender}
                            style={RideDetailStyle.CalenderImg}
                            resizeMode="contain"
                          />
                        </View>

                        <View>
                          <Text style={RideDetailStyle.DateText}>
                            20 Dec 2024
                          </Text>
                        </View>
                        <View style={RideDetailStyle.AtTextView}>
                          <Text style={RideDetailStyle.AtText}>at</Text>
                        </View>
                        <View>
                          <Text style={RideDetailStyle.TimeText}>01:59pm</Text>
                        </View>
                      </View>
                    </View>
                    <View style={RideDetailStyle.RideTextView}>
                      <Text style={RideDetailStyle.RideText}>Ride Id #433</Text>
                    </View>
                    <View style={RideDetailStyle.DistanceRowView}>
                      <View style={RideDetailStyle.DistanceRow}>
                        <View>
                          <Text style={RideDetailStyle.DistanceText}>
                            Distance :
                          </Text>
                        </View>

                        <View>
                          <Text style={RideDetailStyle.DistanceValueText}>
                            239.00 KM
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={RideDetailStyle.stepper}>
                      <View style={RideDetailStyle.step}>
                        <Image
                          source={Compass}
                          style={RideDetailStyle.CompassImg}
                          resizeMode="contain"
                        />
                        <View>
                          <Text style={RideDetailStyle.textSteps}>
                            20 Dec 2024 at 11:02 AM
                          </Text>
                          <Text style={RideDetailStyle.textSteps}>
                            Tiruppur, Tamil Nadu, India
                          </Text>
                        </View>
                      </View>
                      <View style={RideDetailStyle.lineView}>
                        <View style={RideDetailStyle.line}></View>
                      </View>

                      {/* End Location */}
                      <View style={RideDetailStyle.step}>
                        <Image
                          source={Destination}
                          style={RideDetailStyle.DestinationImg}
                          resizeMode="contain"
                        />
                        <View>
                          <Text style={RideDetailStyle.textSteps}>
                            20 Dec 2024 at 11:02 AM
                          </Text>
                          <Text style={RideDetailStyle.textSteps}>
                            Salem, Tamil Nadu, India
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={RideDetailStyle.ViewHistoryRow}>
                      <View>
                        <Text style={RideDetailStyle.ViewHistoryText}>
                          View History
                        </Text>
                      </View>
                      <View>
                        <Image
                          source={RightArrow}
                          style={RideDetailStyle.RightArrowIcon}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={RideDetailStyle.PaymentDetailsBoxSpaceView}>
                <View style={RideDetailStyle.PaymentDetailsBoxSpace}>
                  <View style={RideDetailStyle.PaymentDetailsBox}>
                    <View style={{}}>
                      <Text style={RideDetailStyle.PaymentDetailsText}>
                        Payment Details
                      </Text>
                    </View>

                    <View style={RideDetailStyle.PaymentValueText}>
                      <View>
                        <Text style={RideDetailStyle.ViaText}>Via</Text>
                      </View>
                      <View>
                        <Text style={RideDetailStyle.CashText}>Cash</Text>
                      </View>
                    </View>
                    <View style={RideDetailStyle.StatusRowView}>
                      <View>
                        <Text style={RideDetailStyle.StatusText}>Status</Text>
                      </View>
                      <View>
                        <Text style={RideDetailStyle.StatusValueText}>
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={RideDetailStyle.AmountBoxSpacingView}>
                <View style={RideDetailStyle.AmountBoxSpacing}>
                  <View style={RideDetailStyle.AmountBox}>
                    <View style={RideDetailStyle.PriceDetailsBottomBorder}>
                      <Text style={RideDetailStyle.PriceDetailsText}>
                        Price Details
                      </Text>
                    </View>

                    <View style={RideDetailStyle.RideChargesRowView}>
                      <View>
                        <Text style={RideDetailStyle.RideChargesText}>
                          Ride Charge
                        </Text>
                      </View>
                      <View>
                        <Text style={RideDetailStyle.RideChargesValueText}>
                          Rs 0.00
                        </Text>
                      </View>
                    </View>
                    <View style={RideDetailStyle.AdditionalChargesRowView}>
                      <View>
                        <Text style={RideDetailStyle.AdditionalChargesText}>
                          Additional Charge
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={RideDetailStyle.AdditionalChargesValueText}>
                          Rs 100.00
                        </Text>
                      </View>
                    </View>
                    <View style={RideDetailStyle.TotalRowView}>
                      <View>
                        <Text style={RideDetailStyle.TotalText}>Total</Text>
                      </View>
                      <View>
                        <Text style={RideDetailStyle.TotalValueText}>
                          Rs 100.00
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={RideDetailStyle.CashCollectedBtnView}>
              <TouchableOpacity style={RideDetailStyle.CashCollectedBtn}>
                <Text style={RideDetailStyle.CashCollectedText}>
                  Cash Collected
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RideDetail;
