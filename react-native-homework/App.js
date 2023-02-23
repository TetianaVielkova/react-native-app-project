import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import { useCallback } from 'react';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const MainStack = createStackNavigator();

  export default function App() {
    const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    }

  return (
    <>
    <StatusBar style="auto" />
    <NavigationContainer onLayout={onLayoutRootView}>
      <MainStack.Navigator>
        <MainStack.Screen options={{ headerShown: false }} name="Registration" component={RegistrationScreen} />
        <MainStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
    </>
  );
}