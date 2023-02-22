import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet,  View, Dimensions } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import { useCallback } from 'react';
// import LoginScreen from './Screens/LoginScreen/LoginScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={require("./assets/PhotoBG.jpg")} style={styles.image}>
      <RegistrationScreen/>
      {/* <LoginScreen /> */}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Roboto-Regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
