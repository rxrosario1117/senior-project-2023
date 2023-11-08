import { Modal, TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from 'react';
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBudgets } from "../contexts/BudgetsContext"
import {Picker} from '@react-native-picker/picker';


export default function AddExpenseModal({ show = false, onClose, defaultBudgetId }) {

    const [visible, setVisible] = useState(show);
    const { addExpense, budgets } = useBudgets()


    useEffect(() => {
        
        formData.budget = defaultBudgetId
        setVisible(show); // Update the visibility state when the 'show' prop changes
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
        //const Id = parseInt(budget);

    
     
        addExpense({
            
            description: description,
            amount: amountCost,
            budgetId: budget
            
        })
    
        
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
                    <Picker.Item label={budget.name} value={budget.id}/>
                   
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




