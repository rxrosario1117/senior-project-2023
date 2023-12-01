import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { currencyFormatter } from '../../utils';
import * as Progress from 'react-native-progress';
import CustomButton from '../CustomButton';


const BudgetCard = ({ name, amount, max, hideButtons, onAddExpenseClick, onViewExpenseClick}) => {

    const cardColor = (amount < max) ? 'white': '#ffe6e5' 

    return (
  
        <View style={{backgroundColor: `${cardColor}`, margin: 5}}>
           
            <View style={styles.container}>
                <Text style={styles.title}>{name}</Text>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>{currencyFormatter.format(amount)} </Text>
                <Text style={styles.subTitle}>/ {currencyFormatter.format(max)}</Text>
                </View>
            </View>

            <Progress.Bar progress={amount/max} 
            style={styles.bar} 
            width={380} height={20} 
            color={getColorStatus(amount, max, cardColor)} 
            borderColor='white'
            unfilledColor='#DFDFDF'/>


            {!hideButtons && (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end' }}>                      
                
                <View style={styles.budgetButton}>
                <CustomButton text="Add Expense" type="SECONDARY" onPress={onAddExpenseClick}/>
                </View>

                <View style={styles.budgetButton}>
                <CustomButton text="View Expenses" type="TERTIARY" onPress={onViewExpenseClick}/>
                </View>
       
            </View>)
            }
        </View>
        
    );
};

function getColorStatus(amount, max) {
    const ratio = amount / max
   

    if (ratio <= 0.5) return "#007AFF"
    if (ratio < 0.80) return "orange"
    return "red"
}



const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between", 
      alignItems: "baseline",
      padding: 10,
      marginBottom: 3
      
    },
    title: {
        fontSize: 20,
        color: 'black', 
    }, 
    subTitle: {
        fontSize: 15,
        color: 'gray'
    },
    bar: {
        margin: 15,
        
    },
    budgetButton: {
        marginEnd: 10,
        maxWidth: 130, 
        maxHeight: 60,

    }

  });

export default BudgetCard; 