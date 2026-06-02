import { useEffect, useState, } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getAllExpenses, updateExpenseById, deleteExpenseById, } from "../database/expenseRepository";

export function EditExpenseScreen({ route, navigation }: any) {
    const { id } = route.params;
    const [description, setDescription] = useState('');
    const [value, setValue ] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        (async () => {
            const expenses = await getAllExpenses();
            const expense = expenses.find((item: any) => item.id === id);

            if (expense) {
                setDescription(expense.description);
                setValue(String(expense.value));
                setCategory(expense.category);
            }
        })();
    }, []);

    const update = async () => {
        await updateExpenseById({ id, description, value:Number(value), category, date: new Date().toISOString() });
        navigation.goBack({ reaload: true });
    }

    const remove = async () => {
        await deleteExpenseById(id);
        navigation.goBack();
    }

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
        />
      <TextInput
            style={styles.input}
            value={value}
            keyboardType="numeric"
            onChangeText={setValue}
      />
      <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
      />
      <TouchableOpacity
            style={styles.updateButton}
            onPress={update}
      >
        <Text
            style={styles.text}
        >
            Atualizar
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={remove}
        >
        <Text
            style={styles.text}
        >
            Excluir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
    },
    updateButton: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: "#F44336",
        padding: 12,
        borderRadius: 8,
    },
    text: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold",
    },
});