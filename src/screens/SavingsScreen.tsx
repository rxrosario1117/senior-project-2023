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
import { SelectList } from 'react-native-dropdown-select-list'
import TransactionsAPI from '../components/apiCall/Transactions/TransactionsAPI';
import IdentityAPI from '../components/apiCall/Identity/IdentityAPI';

const SavingsScreen = ({ navigation }: any) => {
  let transactions = TransactionsAPI();
  let identity = IdentityAPI();
  
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  const [selectedMonth, setSelectedMonth] = useState("January");

  // Dropdown list data
  const dropDownList = [
    {key:'1', value:'January', disabled:false},
    {key:'2', value:'February'},
    {key:'3', value:'March'},
    {key:'4', value:'April'},
    {key:'5', value:'May'},
    {key:'6', value:'June'},
    {key:'7', value:'July'},
    {key:'8', value:'August'},
    {key:'9', value:'September'},
    {key:'10', value:'October'},
    {key:'11', value:'November'},
    {key:'12', value:'December'}
]

  // Show a loading bar while the API is working
  if (transactions == null || identity == null) {
    return (
      <SafeAreaView>
              <ActivityIndicator />
        </SafeAreaView>
    )
  }

  let savingsAccountList = []
  let numOfaccounts = identity.identity.Identity.accounts.length
  let numOfTransactions = transactions.transactions.transactions.length;
  let transactionDates = []
  let transactionAmounts = []
  let dataPoints = []
  let accountLastFour = [] 

  // Sets the savings account list
  for (let i = 0; i < numOfaccounts; i++) {
    let name = identity.identity.Identity.accounts[i].name;
    let accountNum = identity.identity.Identity.accounts[i].account_id;
    let maskNum = identity.identity.Identity.accounts[i].mask;
  
    if (name.includes("Saving")) {
      savingsAccountList.push(accountNum)
      accountLastFour.push(maskNum)
    }
  }

  // Capture amount and date of transactions on the savings account only
  for (let i = 0; i < numOfTransactions; i++) {
    let accountID = transactions.transactions.transactions[i].account_id;
    
    if (accountID == savingsAccountList[0]) {
      transactionDates.push(transactions.transactions.transactions[i].authorized_date)
      transactionAmounts.push(transactions.transactions.transactions[i].amount)
    }
  }
  
  let monthsTransactions = []

  let janTransactions = []
  let febTransactions = []
  let marTransactions = []
  let aprTransactions = []
  let mayTransactions = []
  let junTransactions = []
  let julTransactions = []
  let augTransactions = []
  let sepTransactions = []
  let octTransactions = []
  let novTransactions = []
  let decTransactions = []

  if (transactionDates != null) {
    // Fill transactions array
    for (let i = 0; i < transactionDates.length; i++) {
      let month = transactionDates[i].charAt(5) + transactionDates[i].charAt(6)
      let amount = transactions.transactions.transactions[i].amount

      if(amount > 0) {
        // Fill corresponding monthly transaction array
        if (month == '01') {
          janTransactions.push(amount)
        } else if (month == '02') {
          febTransactions.push(amount)
        } else if (month == '03') {
          marTransactions.push(amount)
        } else if (month == '04') {
          aprTransactions.push(amount)
        } else if (month == '05') {
          mayTransactions.push(amount)
        } else if (month == '06') {
          junTransactions.push(amount)
        } else if (month == '07') {
          julTransactions.push(amount)
        } else if (month == '08') {
          augTransactions.push(amount)
        } else if (month == '09') {
          sepTransactions.push(amount)
        } else if (month == '10') {
          octTransactions.push(amount)
        } else if (month == '11') {
          novTransactions.push(amount)
        } else if (month == '12') {
          decTransactions.push(amount)
        }
      }
     
      
      
      //Makes the app crash
    //   // If month and selected month are the same, add the amount of the transaction
    //   if (month == '01' && selectedMonth == 'January') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '02' && selectedMonth == 'February') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '03' && selectedMonth == 'March') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '04' && selectedMonth == 'April') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '05' && selectedMonth == 'May') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '06' && selectedMonth == 'June') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '07' && selectedMonth == 'July') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '08' && selectedMonth == 'August') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '09' && selectedMonth == 'September') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '10' && selectedMonth == 'October') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '11' && selectedMonth == 'November') {
    //     monthsTransactions.push(amount)
    //   } else if (month == '12' && selectedMonth == 'December') {
    //     monthsTransactions.push(amount)
    //   }
    }
  }  

  // The x-axis months can be set with an array
  let months = []

  if (selectedMonth == 'January') {
    months.push('January')
    dataPoints = janTransactions;
  } else if (selectedMonth == 'February') {
    months.push('February')
    dataPoints = febTransactions;
  } else if (selectedMonth == 'March') {
    months.push('March')
    dataPoints = marTransactions;
  } else if (selectedMonth == 'April') {
    months.push('April')
    dataPoints = aprTransactions;
  } else if (selectedMonth == 'May') {
    months.push('May')
    dataPoints = mayTransactions;
  } else if (selectedMonth == 'June') {
    months.push('June')
    dataPoints = junTransactions;
  } else if (selectedMonth == 'July') {
    months.push('July')
    dataPoints = julTransactions;
  } else if (selectedMonth == 'August') {
    months.push('August')
    dataPoints = augTransactions;
  } else if (selectedMonth == 'September') {
    months.push('September')
    dataPoints = sepTransactions;
  } else if (selectedMonth == 'October') {
    months.push('October')
    dataPoints = octTransactions;
  } else if (selectedMonth == 'November') {
    months.push('November')
    dataPoints = novTransactions;
  } else if (selectedMonth == 'December') {
    months.push('December')
    dataPoints = decTransactions;
  }   

  return (
    <SafeAreaView>      
      <ScrollView>
        <View>
          <Text style={styles.title}>Transactions Tracker</Text>
          <LineChart
            data={{
              labels: months,
              datasets: [
                {
                  data: dataPoints
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
              marginVertical: 0,
              borderRadius: 16
            }}
          />
          {/* under line chart */}

          <Text style={styles.title}>Account: ...{accountLastFour[0]}</Text>

          <SelectList 
            setSelected={(val) => setSelectedMonth(val)} 
            data={dropDownList} 
            save="value"
          />
          
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
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
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