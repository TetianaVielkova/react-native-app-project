import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer} from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useRoute } from './router';
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { onAuthStateChanged } from "firebase/auth";
import {auth} from './fіrebase/config'


  export default function App() {
    const [user, setUser] = useState(null)

    const routing = useRoute(user);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        const uid = user.uid;
      }
    });
    

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
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>
      </Provider>
  );
}

