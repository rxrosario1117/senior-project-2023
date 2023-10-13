/*Dependencies for react-native-chart-kit: lodash, paths-js, point-in-polygon*/

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
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const SavingsScreen = ({ navigation }: any) => {
    const [savings, setSavings] = useState(null);
    
    const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    const showCash = () => {
        navigation.navigate("Options", true);
    }

    const showSpending = () => {
        navigation.navigate("Options", true);
    }

    const showCreditCard = () => {
        navigation.navigate("Options", true);
    }    

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.title}>Savings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.title}>Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.title}>Spending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.title}>Credit Card</Text>
                </TouchableOpacity>
            </View>

            <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["Sept.", "Oct", "Nov"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 90,
      borderRadius: 16
    }}
  />
</View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        padding: 15,
        backgroundColor: '#FFFFFF',
      },
      buttonContainer: {
        paddingEnd: 10,
        width: '25%'
      },
      title: {
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
      },
});

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


export default SavingsScreen;