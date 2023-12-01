import { Modal, TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from 'react';
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBudgets } from "../contexts/BudgetsContext"
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';


export default function AddExpenseModal({ show = false, onClose, defaultBudgetId, updateBudgets }) {

    const [visible, setVisible] = useState(show);
    //const { addExpense, budgets } = useBudgets();
    const [budgets, setBudgets] = useState([]);


    useEffect(() => {
        
        formData.budget = defaultBudgetId
        let isMounted = true;

        const fetchBudgets = async () => {
          try {
          
            const budgetsSnapshot = await firestore().collection('Budgets').get();
            const budgetsData = budgetsSnapshot.docs.map((doc) => doc.data());

     
            if (isMounted) {
  
              setBudgets([]);
  
     
              setBudgets(budgetsData);
            }
  
          } catch (error) {
            console.error('Error fetching budgets:', error);
          }
        };
    
        fetchBudgets();
        setVisible(show);
 
         // Update the visibility state when the 'show' prop changes
      }, [show]);

    
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        budget: defaultBudgetId 
    });

    const handleInputChange = (field, text) => {
        
       
        setFormData({
          ...formData,
          [field]: text,
        });

        
    };

    useEffect(() => {
 
      }, [visible]);

    const closeModal = () => {
        onClose();
        setVisible(false)
        
    }



    function handleSubmit(){

        
        // Handle form submission logic here
        // Get the values from the formData state
        const { description, amount, budget } = formData;

        // Convert maxSpend to a float
        const amountCost = parseFloat(amount);

        const randID = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

        const currentDateTime = new Date();

        firestore()
        .collection('Expenses')
        .add({
            ID: randID,
            description: description,
            amount: amountCost,
            budgetID: budget,
            date: currentDateTime.toString()
        })
        .then(() => {

            updateBudgets()
            console.log('Expense added!');

        });
    
    
        
        closeModal()
        

    };

    return (
        
   
        
        <Modal visible={visible} animationType="slide">
        <View style={{padding: 15, marginTop: 10, borderWidth: 2, borderColor: 'black'}}>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color: 'black', fontSize: 25, marginBottom: 25}}>
                    New Expense
                </Text>

              
                <TouchableOpacity style={styles.container} onPress={closeModal}>
                    <Icon name="times" size={35} color="gray" />
                </TouchableOpacity>
            </View>

            <Text style={{marginLeft: 5}}>Description</Text>
            <TextInput 
                
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
                style={styles.input}
               
            />

            <Text style={{marginLeft: 5}}>Amount</Text>
            <TextInput 
                keyboardType="numeric"
                value={formData.amount}
                onChangeText={(text) => handleInputChange('amount', text)}
                style={styles.input}
              
            />

            <Text style={{marginLeft: 5}}>Budget</Text>
           
            <Picker
            selectedValue={defaultBudgetId !== 0 ? defaultBudgetId : formData.budget}
            onValueChange={(itemValue) => handleInputChange('budget', itemValue)}
            >
                <Picker.Item label={"Select Category"}/>
               
   
               {budgets.map(budget => (
                    <Picker.Item label={budget.budgetName} value={budget.budgetID}/>
                   
                ))}

      

                
       

            </Picker>
        
    

            <View>
                <CustomButton 
                text="Add"
                onPress={handleSubmit}/>
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




