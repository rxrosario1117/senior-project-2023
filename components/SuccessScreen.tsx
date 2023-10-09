import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  Platform,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
var styles = require('./style');

const SuccessScreen = ({ navigation, route }: any) => {
  const [data, setData] = useState(null);
  const [identity, setIdentity] = useState(null);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  // Fetch balance data
  const getBalance = useCallback(async () => {
    await fetch(`http://${address}:8080/api/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      console.log(err);
    });
  });

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

  useEffect(() => {
    if (identity == null) {
      getIdentity();
    }
    if (data == null) {
      getBalance();
    }
  }, [data])

  if (data == null) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Balance Response</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.baseText}>
            {
              JSON.stringify(data)
            }
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.baseText}>
            {
              JSON.stringify(identity)
            }
        </Text>
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

export default SuccessScreen;