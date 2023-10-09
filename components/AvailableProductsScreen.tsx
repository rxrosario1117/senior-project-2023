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

const AvailableProductsScreen = ({ navigation, route }: any) => {
    const[products, setProducts] = useState(null);
    const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

        const showOptions = () => {
            navigation.navigate("Options", true);
        }

        const getProductsAvailable = useCallback(async () => {
            await fetch(`http://${address}:8080/api/item/get`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },                
            })
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err);
            });
        });

        useEffect(() => {
            if (products == null) {
                getProductsAvailable();
            }
        }, [products])

        // Show loading circle while wating for information
        if (products == null) {
            return (
                <SafeAreaView>
                    <ActivityIndicator />
                </SafeAreaView>
            )
        }

        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.heading}>
                    <Text style={styles.titleText}>Available Items</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.subTitleText}>Items Available:</Text>
                    <Text style={styles.baseText}>
                        {
                            JSON.stringify(products, null, 2)
                        }
                    </Text>
                </ScrollView>

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
  
  export default AvailableProductsScreen;