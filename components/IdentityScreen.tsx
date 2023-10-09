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
    });

    const getTransactions = useCallback(async () => {
      await fetch(`http://${address}:8080/api/transactions/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => {
        console.log(err);
      });
    });

    useEffect(() => {
      if (identity == null) {
        getIdentity();
      }
    }, [identity])

    useEffect(() => {
      if (transactions == null) {
        getTransactions();
      }
    }, [transactions])

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
              JSON.stringify(identity.Identity.accounts[0].account_id, null, 2)
            }
        </Text>
      </ScrollView>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.baseText}>
          Transactions: 
            {
              JSON.stringify(transactions, null, 2)
            }
        </Text>
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