import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./slices/expenseSlice";
import categoriesReducer from "./slices/expenseSlice";

export const store = configureStore({
    reducer: {
        expenses: expenseReducer,
        categories: categoriesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
