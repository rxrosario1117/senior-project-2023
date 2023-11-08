
import { Modal, TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from 'react';
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBudgets } from "../contexts/BudgetsContext"



export default function ViewExpensesModal({ budgetId, show = false, onClose }) {

    const [visible, setVisible] = useState(show);
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

 
    const expenses = getBudgetExpenses(budgetId)
    const budget = budgets.find(b => b.id == budgetId) 

    useEffect(() => {

        setVisible(show); // Update the visibility state when the 'show' prop changes
      }, [show]);



    useEffect(() => {
 
      }, [visible]);

    const closeModal = () => {
        onClose();
        setVisible(false)
        
    }



    return (

   
        
        <Modal visible={visible} animationType="slide">
        <View style={{padding: 15, marginTop: 10, borderWidth: 2, borderColor: 'black'}}>




            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color: 'black', fontSize: 25, marginBottom: 25}}>
                    Expenses - {budget?.name}
                </Text>


              
                <TouchableOpacity style={styles.container} onPress={closeModal}>
                    <Icon name="times" size={40} color="gray" />
                </TouchableOpacity>
            </View>



     
            {expenses.map(expense => (
                <View>
                    <Text>{expense.description}</Text>
                    <Text>{expense.amount}</Text>
                </View>
            ))}

            <View>
                    <CustomButton 
                    type="QUATERNARY"
                    text="Delete Budget"
                    onPress={() => {
                        deleteBudget(budget)
                        closeModal()
                    }}/>
            </View>

        </View>
        </Modal>

       
    )
}

const styles = StyleSheet.create({

    input: {
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 15

    }, 
    container: {
        backgroundColor: 'white', // Background color
        borderRadius: 30, // Adjust this to your preference
        width: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },


});

