import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from 'react-native';
import BalanceAPI from '../components/apiCall/Balance/BalanceAPI';
var styles = require('./style');

const BalanceScreen = ({ navigation, route }: any) => {
  let balance = BalanceAPI();
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  let accounts = [];
  let accountNames = [];
  let accountBalances = [];
  let totalBalance = 0;

  if (balance != null) {
    let numOfAccounts = balance?.balance.Balance.accounts.length;
    totalBalance = 0;
    
    // Fill accounts array and get account name/balance and the sum of all balances
    for (let i = 0; i < numOfAccounts; i++) {
      let currAccount = balance?.balance.Balance.accounts[i];
      let currAccountName = currAccount.subtype;
      let currAccountBal = currAccount.balances.available;

      accounts.push(currAccount);
      accountNames.push(currAccountName);
      accountBalances.push(currAccountBal);

      totalBalance += currAccountBal;
    }    
  }

  // Shows the loading circle while waiting for the API to return info
  if (balance == null) {
    return (
      <SafeAreaView>
          <ActivityIndicator />
      </SafeAreaView>
    )        
  }

  return (
    // <View style={{ flex: 1 }}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Balance</Text>
      </View>

      <View>
        <Text style={styles.subTitleText}>{accountNames[0]}: {accountBalances[0]}</Text>
        <Text style={styles.subTitleText}>{accountNames[1]}: {accountBalances[1]}</Text>
        <Text style={styles.subTitleText}>Total Balance: {totalBalance}</Text>
      </View>
    </ScrollView>
  );
};

function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}

export default BalanceScreen;