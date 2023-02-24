import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import HomeScreen from "./Screens/HomeScreen/HomeScreen";

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return ( <MainStack.Navigator>
            <MainStack.Screen options={{ headerShown: false }} name="Registration" component={RegistrationScreen} />
            <MainStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <MainStack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        </MainStack.Navigator>
    )}
}
