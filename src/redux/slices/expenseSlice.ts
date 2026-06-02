import { Expense } from "../../types/Expense";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseState {
    expenses: Expense[];
}

const initialState: ExpenseState = {
    expenses: []
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses: (state, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload
        },
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
        removeExpense: (state, action: PayloadAction<string>) => {
            state.expenses.filter((e) => e.id !== action.payload);
        },
        updateExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.expenses.findIndex(
                e => e.id === action.payload.id
            )

            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },
    }
});

export const { setExpenses, addExpense, removeExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
