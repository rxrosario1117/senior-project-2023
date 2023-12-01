import React, {useState, useEffect, useCallback} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    useWindowDimensions, 
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity } from 'react-native';

var styles = require('../style');


const SettingsScreen = ({ navigation, route }: any) => {
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

  const showConnectToBank = () => {
    navigation.navigate("ConnectBankScreen", true);
  }

  return (
        <ScrollView>
            <View style={styles.heading}>
              <Text style={styles.titleText}>Settings</Text>
            </View>
            
            <View style={{ flex: 1 }} >
                <View style={styles.body}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={showConnectToBank}>
                        <Text style={styles.buttonText}>Connect to Bank</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Disconnect From Bank</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default SettingsScreen;