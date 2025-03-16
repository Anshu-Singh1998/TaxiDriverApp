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
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import WalletStyle from './WalletStyle';


const Wallet = ({navigation}) => {
  const data = [
    {
      id: '1',
      debit: 'Money Debit',
      amount: '- Rs 10.00',
      commission: 'Admin Role Commission ',
      date: '20 Dec 2024',
      time: '11:02 AM',
    },
    {
      id: '2',
      debit: 'Money Debit',
      amount: '- Rs 0.00',
      commission: 'Admin Role Commission ',
      date: '16 Dec 2024',
      time: '05:59 PM',
    },
    {
      id: '',
      debit: 'Money Debit',
      amount: '- Rs 5.00',
      commission: 'Admin Role Commission ',
      date: '15 Dec 2024',
      time: '03:05 PM',
    },
  ];

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
            <Image source={Left} resizeMode="contain" style={WalletStyle.backIcon} />
          </TouchableOpacity>
          <Text style={WalletStyle.headerTitle}>Emergency Contacts</Text>
        </View>
        <ScrollView>
          <View>
            <View style={WalletStyle.AvailableBalanceViewContainer}>
              <View style={WalletStyle.AvailableBalanceView}>
                <Text style={WalletStyle.AvailableBalanceText}>
                  Available Balance
                </Text>
                <Text style={WalletStyle.AvailableBalanceTextValue}>
                  Rs. -659.00
                </Text>
              </View>
            </View>
            <View style={WalletStyle.RecentTransactionsTextView}>
              <View>
                <Text style={WalletStyle.RecentTransactionsText}>
                  Recent Transactions
                </Text>
              </View>
              <View>
                {/* <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => ( */}
                {data.map((item, index) => (
                  <View key={index.toString()} style={WalletStyle.ListReasonView}>
                    <View style={WalletStyle.listContainer}>
                      <View style={WalletStyle.listRow}>
                        <View style={WalletStyle.DashTextView}>
                          <Text style={WalletStyle.DashText}>-</Text>
                        </View>
                        <View style={WalletStyle.commissionView}>
                          <View>
                            <Text style={WalletStyle.DebitText}>{item.debit}</Text>
                          </View>
                          <View>
                            <Text style={WalletStyle.CommissionText}>
                              {item.commission}
                            </Text>
                          </View>
                          <View>
                            <Text style={WalletStyle.DateTimeText}>
                              {item.date} at {item.time}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text style={WalletStyle.AmountText}>{item.amount}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                {/* // )}
            /> */}
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
