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

  const [item, setItem] = useState(null);
  
  const unlink = useCallback(async () => {   
    await fetch(`http://${address}:8080/api/itemRemove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data) 
      setItem(data.request_id)
        
    })
    .catch((err) => {
      console.warn(err);
    });
  }, [])

  const showConnectToBank = () => {
    navigation.navigate("ConnectBankScreen", true);
  }

  // useEffect(() => {
  //   if (item == false) {
  //     item = true;
  //     unlink();
  //   }
  // }) 

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
                
                    <TouchableOpacity style={styles.buttonContainer} onPress={unlink}>
                        <Text style={styles.buttonText}>Disconnect From Bank</Text>
                    </TouchableOpacity>

                    <Text>{item}</Text>
                </View>
            </View>
        </ScrollView>
    )

}

export default SettingsScreen;