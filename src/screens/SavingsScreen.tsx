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
import TransactionsAPI from '../components/apiCall/Transactions/TransactionsAPI';



const SavingsScreen = ({ navigation }: any) => {
  let transactions = TransactionsAPI();
  
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

  if (transactions == null) {
    return (
      <SafeAreaView>
              <ActivityIndicator />
        </SafeAreaView>
    )
  }

  let numOfAccounts = 0;


  let nums = [
    transactions.transactions.transactions[0].amount,
    transactions.transactions.transactions[1].amount,
    transactions.transactions.transactions[2].amount,                    
    transactions.transactions.transactions[4].amount,                    
    transactions.transactions.transactions[5].amount,                    
    transactions.transactions.transactions[3].amount
  ]
  
  

  return (
    <SafeAreaView>      
      <ScrollView>
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
                  data: nums
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
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
          <Text>Try to get for loop working to fill the graph with positive transaction val's only</Text>

          {/* under line chart */}
          <Text>
            {
              JSON.stringify(transactions.transactions.transactions[3].amount, null, 2)
            }
          </Text>
        </View>
          
      </ScrollView>
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