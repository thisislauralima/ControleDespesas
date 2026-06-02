import { createExpense } from "../database/expenseRepository";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Text} from "react-native";
import { v4 as uuid } from "uuid";

export const CreateExpensesScreen = ({ navigation }: any) => {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const save = async () => {
        if (!description || !value || !category) {
            window.alert("Todos os campos devem ser preenchidos.");
            return;
        }
        await createExpense({
            id: uuid(),
            description,
            value: Number(value),
            category,
            date: new Date().toISOString(),
        });
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Descrição"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                placeholder="Valor"
                style={styles.input}
                keyboardType="numeric"
                value={value}
                maxLength={3}
                onChangeText={setValue}
            />
            <TextInput
                placeholder="Categoria"
                style={styles.input}
                value={category}
                maxLength={15}
                onChangeText={setCategory}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={save}
            >
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
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
    button: {
        backgroundColor: "#975555",
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "bold"
    }
});