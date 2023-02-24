import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer} from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useRoute } from './router';


  export default function App() {

    const routing = useRoute({});

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
    <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>
    </>
  );
}



