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

  let assets = [];
  let liabilities = [];
  let totalBalance = 0;
  let numOfAccounts = 0;

  if (balance != null) {
    numOfAccounts = balance?.balance.Balance.accounts.length;
    totalBalance = 0;
    
    // Fill accounts array and get account name/balance and the sum of all balances
    for (let i = 0; i < numOfAccounts; i++) {
      let currAccount = balance?.balance.Balance.accounts[i];
      let accountSubtype = currAccount.subtype;

      if (accountSubtype == 'credit card' || accountSubtype == 'student' || accountSubtype == 'mortgage') {
        liabilities.push(currAccount);
      } else {
        assets.push(currAccount);
      }
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Assets</Text>
      </View>

      <View>
        {
          assets.map(asset => (
            <>
              <Text style={styles.subTitleText}>{asset.subtype}: $ {asset.balances.current}</Text>
            </>
          ))
        }
      </View>

      <View style={styles.heading}>
        <Text style={styles.titleText}>Liabilities</Text>
      </View>

      <View>
        {
          liabilities.map(liability => (
            <>
              <Text style={styles.subTitleText}>{liability.subtype}: $ {liability.balances.current}</Text>
            </>
          ))
        }
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