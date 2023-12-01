
import { Modal, TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from 'react';
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBudgets } from "../contexts/BudgetsContext";
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";
import { TabView } from "react-native-tab-view";



export default function ViewExpensesModal({ budgetId, show = false, onClose, updateBudgets }) {

    const [visible, setVisible] = useState(show);
    const { getBudgetExpenses, deleteExpense } = useBudgets()

 
    const [expenses, setExpenses] = useState([])
    const [budgets, setBudgets] = useState([]);
  
    const budget = budgets.find(b => b.budgetID == budgetId) 

    const fetchBudgets = async () => {
        try {
  
          const budgetsSnapshot = await firestore().collection('Budgets').get();
          const budgetsData = budgetsSnapshot.docs.map((doc) => doc.data());
  
          const expensesSnapshot = await firestore().collection('Expenses').get();
          const expenseData = expensesSnapshot.docs.map((doc) => doc.data());
   
          setExpenses([]);
          setBudgets([]);
          
  
          setExpenses(expenseData);
          setBudgets(budgetsData);
          
  
        } catch (error) {
          console.error('Error fetching budgets:', error);
        }
      };


    useEffect(() => {
        fetchBudgets();
        setVisible(show); // Update the visibility state when the 'show' prop changes
      }, [show]);



    useEffect(() => {
 
      }, [visible]);

    const closeModal = () => {
        onClose();
        setVisible(false)
        
    }

    function deleteBudget(id) {

        firestore()
        .collection('Budgets')
        .where('budgetID', '==', id)
        .get()
        .then(
            querySnapshot => {
            const doc = querySnapshot.docs[0];
            doc.ref.delete();
            updateBudgets();

        })

        firestore()
        .collection('Expenses')
        .where('budgetID', '==', id)
        .get()
        .then(
            querySnapshot => {
            
                const batch = firestore().batch();

                querySnapshot.forEach(doc => {
                    batch.delete(doc.ref);
                });

                batch.commit();

                

                updateBudgets();
            
        })


        
    }


    return (

   
        
        <Modal visible={visible} animationType="slide">
        <View style={{padding: 15, marginTop: 10,}}>




            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 30}}>
                <Text style={{color: 'black', fontSize: 25, marginBottom: 25}}>
                    Expenses  {budget?.name}
                </Text>


              
                <TouchableOpacity style={styles.container} onPress={closeModal}>
                    <Icon name="times" size={40} color="gray" />
                </TouchableOpacity>
            </View>



           
     
            {expenses.map(expense => (
                <View style={{marginBottom: 30}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 20}}>{expense.description}</Text>
                        <Text style={{fontSize: 20}}>${expense.amount}</Text>
                    </View>
                    <View>
                        <Text>{expense.date}</Text>
                    </View>
                
                </View>
            ))}
       

            <View style={{marginTop: 50}}>
                    <CustomButton 
                    type="QUATERNARY"
                    text="Delete Budget"
                    onPress={() => {
                        
                        deleteBudget(budget.budgetID)
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

