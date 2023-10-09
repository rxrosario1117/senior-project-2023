import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
var styles = require('./style');

const OptionsScreen = ({ navigation, route }: any) => {
  const [data, setData] = useState(null);
  const [identity, setIdentity] = useState(null);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    const showIdentity = () => {
    navigation.navigate("Identity", true);
    }
  
    const showBalance = () => {
      navigation.navigate("Balance", true);
    }

    const showProducts = () => {
      navigation.navigate("Products", true);
    }

  return (
    <View style={{ flex: 1 }} >
      <View style={styles.heading}>
        <Text style={styles.titleText}>Show Identity/Balance</Text>
      </View>
           
      <View style={styles.body}>
      <TouchableOpacity style={styles.buttonContainer} onPress={showIdentity}>
        <Text style={styles.buttonText}>Show Identity</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>
      <TouchableOpacity style={styles.buttonContainer} onPress={showBalance}>
        <Text style={styles.buttonText}>Show Balance</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.buttonContainer} onPress={showProducts}>
          <Text style={styles.buttonText}>Show Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}

export default OptionsScreen;