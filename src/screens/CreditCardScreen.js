import React, {useState, useEffect, useCallback} from 'react';
import {
     View, 
     Text, 
     StyleSheet, 
     useWindowDimensions, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import TransactionsAPI from '../components/apiCall/Transactions/TransactionsAPI';
import IdentityAPI from '../components/apiCall/Identity/IdentityAPI';

import BalanceAPI from '../components/apiCall/Balance/BalanceAPI';
var styles = require('./style');


const CreditCardScreen = () => {
  const address = '10.0.2.2';

  const [lib, setLib] = useState(null);
    
  const liabilities = useCallback(async () => {   
    await fetch(`http://${address}:8080/api/liabilities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.liability);  
      console.log('lib stuff') 
      setLib(data)  
    })
    .catch((err) => {
      console.warn(err);
    });
  }, [lib])

  useEffect(() => {
    if (lib == null) {
      liabilities();
    }
  }) 

  hasCreditCard = false;
  isPaymentOverdue = false;
  minPaymentAmount = 0;
  nextPaymentDue = '';
  currentBalance = 0;

  if (lib != null) {
    let accountsLength = lib.liability.accounts.length;

    // Check if credit card account exists
    for(let i = 0; i < accountsLength; i++){
      currAccount = lib.liability.accounts[i];

      if (currAccount.subtype == 'credit card') {
        hasCreditCard = true;
      }
    }

    if (hasCreditCard) {
      // Set all variables from above
      isPaymentOverdue = lib.liability.liabilities.credit[0].is_overdue;
      minPaymentAmount = lib.liability.liabilities.credit[0].minimum_payment_amount;
      nextPaymentDue = lib.liability.liabilities.credit[0].next_payment_due_date;
      currentBalance = lib.liability.accounts[3].balances.current;
    }
  } 

  // Show a loading bar while the API returns info
  if (lib == null) {
    return (
      <SafeAreaView>
              <ActivityIndicator />
        </SafeAreaView>
    )
  }

    return (
        <ScrollView>
            <View style={styles.heading}>
              <Text style={styles.titleText}>Credit Card</Text>
            </View>
            
            <View>
            <Text style={styles.subTitleText}>Current Balance: ${currentBalance}</Text>
            <Text style={styles.subTitleText}>Minimum Due: ${minPaymentAmount}</Text>
            <Text style={styles.subTitleText}>Next Payment Due: {nextPaymentDue}</Text>
            </View>
        </ScrollView>
    )

}

export default CreditCardScreen;