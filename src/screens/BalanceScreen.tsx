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
  const [data, setData] = useState(null);
  let balance = BalanceAPI();
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  const showIdentity = () => {
      navigation.navigate("Identity", true);
  }

  const showOptions = () => {
    navigation.navigate("Options", true);
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
        <Text style={styles.titleText}>Show Identity/Balance</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.baseText}>          
            {
              JSON.stringify(balance, null, 2)
            }
            
        </Text>
      </ScrollView>
           
      <View style={styles.body}>
      <TouchableOpacity style={styles.buttonContainer} onPress={showIdentity}>
        <Text style={styles.buttonText}>Show Identity</Text>
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

export default BalanceScreen;