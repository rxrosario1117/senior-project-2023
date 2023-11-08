import {
     View, 
     Text, 
     StyleSheet, 
     useWindowDimensions, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import TransactionsAPI from '../components/apiCall/Transactions/TransactionsAPI';
import IdentityAPI from '../components/apiCall/Identity/IdentityAPI';


const TempScreen = () => {

    let transactions = TransactionsAPI();
    let identity = IdentityAPI();

    // Show a loading bar while the transactions are filled
  if (transactions == null || identity == null) {
    return (
      <SafeAreaView>
              <ActivityIndicator />
        </SafeAreaView>
    )
  }

  // 197 total transactions


    return (
        <ScrollView>
            <Text>hey</Text>
        </ScrollView>
    )

}

export default TempScreen;