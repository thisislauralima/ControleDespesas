import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types/Expense";

const EXPENSES_KEY = "@expenses";

export const getAllExpenses = async (): Promise<Expense[]> => {
    const data = await AsyncStorage.getItem(EXPENSES_KEY);
    if (!data) return [];
    return JSON.parse(data);
};

export const createExpense = async (expense: Expense) => {
    const expenses = await getAllExpenses();
    expenses.push(expense);

    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};

export const updateExpenseById = async (updatedExpense: Expense) => {
    const expenses = await getAllExpenses();

    const updated = expenses.map((expense: Expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense);

    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));
};

export const deleteExpenseById = async (id: string) => {
    const expenses = await getAllExpenses();

    const filtered = expenses.filter((expense: Expense) => expense.id !== id);

    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(filtered));
};