import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet,  View } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import { useState } from 'react';
// import LoginScreen from './Screens/LoginScreen/LoginScreen';

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {

  const [isReady, setIsReady] = useState(false);

  if(!isReady) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)}/>
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/PhotoBG.jpg")} style={styles.image}>
      <RegistrationScreen/>
      {/* <LoginScreen/> */}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
