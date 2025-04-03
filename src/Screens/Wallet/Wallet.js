import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  WalletStyleheet,
  FlatList,
  ScrollView,
} from 'react-native';
import * as React from 'react';
import {useState, useEffect} from 'react';
import Left from '../../../Assets/Left.png';
import WalletStyle from './WalletStyle';
import {useSelector, useDispatch} from 'react-redux';
import {
  walletList,
  walletListDetails,
  walletTollSave,
} from '../../redux/Slices/WalletSlice';
import moment from 'moment';

const Wallet = ({navigation}) => {
  const dispatch = useDispatch();
  const {status, loading} = useSelector(state => state.wallet);
  const walletData = useSelector(state => state.wallet.data);

  useEffect(() => {
    dispatch(walletList());
  }, []);

  return (
    <View style={WalletStyle.MainContainer}>
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0C3384"
          animated={true}
        />
        <View style={WalletStyle.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={Left}
              resizeMode="contain"
              style={WalletStyle.backIcon}
            />
          </TouchableOpacity>
          <Text style={WalletStyle.headerTitle}>Emergency Contacts</Text>
        </View>
        <ScrollView>
          <View>
            <View style={WalletStyle.AvailableBalanceViewContainer}>
              {walletData.map((item, index) => (
                <View
                  key={index.toString()}
                  style={WalletStyle.AvailableBalanceView}>
                  <Text style={WalletStyle.AvailableBalanceText}>
                    Available Balance
                  </Text>
                  <Text style={WalletStyle.AvailableBalanceTextValue}>
                    Rs {item.balance}
                  </Text>
                </View>
              ))}
            </View>
            <View style={WalletStyle.RecentTransactionsTextView}>
              <View>
                <Text style={WalletStyle.RecentTransactionsText}>
                  Recent Transactions
                </Text>
              </View>
              <View>
           
                {walletData.map((item, index) => (
                  <View
                    key={index.toString()}
                    style={WalletStyle.ListReasonView}>
                    <View style={WalletStyle.listContainer}>
                      <View style={WalletStyle.listRow}>
                        <View style={WalletStyle.DashTextView}>
                          <Text style={WalletStyle.DashText}>-</Text>
                        </View>
                        <View style={WalletStyle.commissionView}>
                          <View>
                            <Text style={WalletStyle.DebitText}>
                              {item.user_display_name}
                            </Text>
                          </View>
                          <View>
                            <Text style={WalletStyle.CommissionText}>
                              {item.transaction_type}
                            </Text>
                          </View>
                          <View>
                            <Text style={WalletStyle.CommissionText}>
                              {item.type}
                            </Text>
                          </View>
                          <View>
                            <Text style={WalletStyle.CommissionText}>
                              {item.currency}
                            </Text>
                          </View>
                          <View>
                            <Text style={WalletStyle.DateTimeText}>
                              {moment(item.datetime).format(
                                'DD MMM YYYY [at] hh:mmA',
                              )}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text style={WalletStyle.AmountText}>
                            {item.wallet_balance}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
        
              </View>
            </View>
            <View style={WalletStyle.AddTollRequestBtnView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TollRequest')}
                style={WalletStyle.AddTollRequestButton}>
                <Text style={WalletStyle.AddTollRequestBtnText}>
                  Add Toll Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Wallet;
