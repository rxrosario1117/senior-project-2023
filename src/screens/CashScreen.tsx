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
var styles = require('./style');

const IdentityScreen = ({ navigation, route }: any) => {
  const [transactions, setTransactions] = useState(null);
  const [identity, setIdentity] = useState(null);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    const showBalance = () => {
        navigation.navigate("Balance", true);
    }

    const showOptions = () => {
      navigation.navigate("Options", true);
    }

    const getIdentity = useCallback(async () => {
      await fetch(`http://${address}:8080/api/identity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        setIdentity(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

    const getTransactions = useCallback(async () => {
      await fetch(`http://${address}:8080/api/transactions/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "start_date": '2018-01-01',  
          "end_date": '2024-02-01'   
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        let temp:Array<{date:string, amount:string, name:string}> = [];
        for (let i = 0; i < data.transactions.length; i++) {
          let date = data.transactions[i].authorized_date;
          let amount = data.transactions[i].amount;
          let name = data.transactions[i].merchant_name;
          let category = data.transactions[i].category[0];
          
          let obj = {
            date,
            amount, 
            name,
            category
          };

          // Negative values can estimate income
          // if (amount < 0)
          temp.push(obj);
        }

        setTransactions(temp);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

    useEffect(() => {
      if (identity == null) {
        getIdentity();
      }
      if (transactions == null) {
        getTransactions();
      }
    }, [transactions, identity])

    // Shows the loading circle while waiting for the API to return info
    if (identity == null || transactions == null) {
      return (
        <SafeAreaView>
            <ActivityIndicator />
        </SafeAreaView>
      )        
    }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Show Identity/Balance</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.baseText}>
          Account ID: 
            {
              // JSON.stringify(identity.Identity.accounts[0].account_id, null, 2)
              JSON.stringify(identity.Identity.accounts[1].subtype, null, 2)
            }
        </Text>
      </ScrollView>

      <ScrollView style={styles.scrollView}>
        {
          transactions.map(transaction => {
            return <Text style={styles.baseText}>
              - name: {transaction.name == null ? "No name found" : transaction.name} 
              - ${transaction.amount} - date: {transaction.date} - category: {transaction.category}
            </Text>
          })
        }        
      </ScrollView>
           
      <View style={styles.body}>
      <TouchableOpacity style={styles.buttonContainer} onPress={showBalance}>
        <Text style={styles.buttonText}>Show Balance</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>
      <TouchableOpacity style={styles.buttonContainer} onPress={showOptions}>
        <Text style={styles.buttonText}>Back To Options</Text>
      </TouchableOpacity>
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

export default IdentityScreen;