import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()


export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', [])
    const [expenses, setExpenses] = useLocalStorage('expenses', [])

    function getBudgetExpenses(budgetID) {
      
   
        
        return expenses.filter(expense => expense.budgetId === budgetID)

    }

    function addExpense({ description, amount, budgetId}) {
        setExpenses(prevExpenses => {

            const randID = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;
            
       
            return [...prevExpenses, { id: randID, description, amount, budgetId }]
        })

       

   

    }

    function addBudget({ name, max }) {

        
    
        setBudgets(prevBudgets => {
           

            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
         
            }

            const randID = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;
            
            return [...prevBudgets, { id: randID, name, max }];
            
        })
        


        
       

        

    }

    function deleteBudget({ id }) {

        
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })

        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.budgetId !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return ( 
    <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>
    )
}

