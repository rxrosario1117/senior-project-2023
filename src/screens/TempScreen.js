import React, {useState, useEffect, useCallback} from 'react';
import {
     View, 
     Text, 
     StyleSheet, 
     useWindowDimensions, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import TransactionsAPI from '../components/apiCall/Transactions/TransactionsAPI';
import IdentityAPI from '../components/apiCall/Identity/IdentityAPI';

import BalanceAPI from '../components/apiCall/Balance/BalanceAPI';


const TempScreen = () => {


    const liabilities = useCallback(async () => {   
      await fetch(`http://${address}:8080/api/liabilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.liability);     
      })
      .catch((err) => {
        console.warn(err);
      });
    }, [])

    useEffect(() => {
      if (liabilities == null) {
        liabilities();
        console.log('liabilities was called')
      }
    }) 

    // Show a loading bar while the transactions are filled
  // if (balance == null) {
  //   return (
  //     <SafeAreaView>
  //             <ActivityIndicator />
  //       </SafeAreaView>
  //   )
  // }

    return (
        <ScrollView>
            <Text>hey</Text>
        </ScrollView>
    )

}

export default TempScreen;