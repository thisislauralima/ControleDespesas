import "react-native-get-random-values";
import { AppNavigator } from "./src/navigation/AppNavigator";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export const App = () => {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}