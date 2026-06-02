import { getAllExpenses } from "../database/expenseRepository";
import { setExpenses } from "../redux/slices/expenseSlice";
import { RootState } from "../redux/store";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Expense } from "../types/Expense";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const HomeScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const expenses = useSelector((state: RootState) => state.expenses.expenses);

    const loadExpenses = async () => {
        const data: Expense[] = await getAllExpenses();
        dispatch(
            setExpenses(
                data.map(item => ({
                id: item.id,
                description: item.description,
                value: item.value,
                category: item.category,
                date: item.date,
            }))));
    }

    useFocusEffect(useCallback(() => {
        (async () => {
            await loadExpenses();
        })();
    }, []));

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(
                "EditExpense", {
                    id: item.id
                }
            )}>
                <Text style={styles.title}>
                    Descrição:
                    {" "}
                    {item.description}
                </Text>
                <Text style={styles.title}>
                    Categoria:
                    {" "}
                    {item.category}
                </Text>
                <Text style={styles.title}>
                    R$:
                    {" "}
                    {item.value}
                </Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => 
                    navigation.navigate("CreateExpense")
                }>
                <Text
                    style={styles.buttonText}
                >
                    Nova Despesa
                </Text>
            </TouchableOpacity>
            <FlatList
                data={expenses}
                renderItem={renderItem}
                keyExtractor={
                    item => item.id
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    button: {
        backgroundColor: "4CAF50",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: "4CAF50",
        textAlign: "center",
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
});