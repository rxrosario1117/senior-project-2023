import {
     View, 
     Text, 
     StyleSheet, 
     useWindowDimensions, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import TransactionsAPI from '../components/apiCall/Transactions/TransactionsAPI';
import IdentityAPI from '../components/apiCall/Identity/IdentityAPI';

import BalanceAPI from '../components/apiCall/Balance/BalanceAPI';


const TempScreen = () => {

    let transactions = TransactionsAPI();
    let identity = IdentityAPI();
    let balance = BalanceAPI();

    // Show a loading bar while the transactions are filled
  if (balance == null) {
    return (
      <SafeAreaView>
              <ActivityIndicator />
        </SafeAreaView>
    )
  }

    return (
        <ScrollView>
            <Text>{JSON.stringify(balance, null, 2)}</Text>
        </ScrollView>
    )

}

export default TempScreen;