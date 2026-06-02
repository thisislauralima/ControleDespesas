import { HomeScreen } from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateExpensesScreen } from "../screens/CreateExpensesScreen";
import { EditExpenseScreen } from "../screens/EditExpenseScreen";

export type RootStackParamList = {
    Home: React.FC;
    CreateExpense: React.FC;
    EditExpense: {
        id: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: "Controle de despesas"}}
                />
                <Stack.Screen
                    name="CreateExpense"
                    component={CreateExpensesScreen}
                    options={{title: "Nova despesa"}}
                />
                <Stack.Screen
                    name="EditExpense"
                    component={EditExpenseScreen}
                    options={{title: "Editar despesa"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}