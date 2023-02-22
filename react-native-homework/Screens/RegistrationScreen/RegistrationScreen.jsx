import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
 
import {loadFonts} from './../../App';

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKey, setIsShowKey] = useState(false);
  

  const loginHandler = (text) => setLogin(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const onLogin = () => {
    setIsShowKey(false);
    Keyboard.dismiss();

    console.log("User", `Login: ${login}  Email:${email} Password:${password}`);
    Alert.alert("User", `Login: ${login}  Email:${email} Password:${password}`);
    
    setLogin('');
    setPassword('');
    setEmail('');
  };

  const keyboardHide = () => {
    setIsShowKey(false);
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}
        >
        <View style={{ marginBottom: isShowKey ? 32 : 79}}>
        <Text style={styles.title}>Регистрация</Text>
          <TextInput
            value={login}
            onChangeText={loginHandler}
            placeholder="Логин"
            style={styles.input}
            onFocus={() => setIsShowKey(true)}
          />
          <TextInput
            value={email}
            onChangeText={emailHandler}
            placeholder="Адрес электронной почты"
            style={styles.input}
            onFocus={() => setIsShowKey(true)}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Пароль"
            secureTextEntry={true}
            style={styles.input}
            onFocus={() => setIsShowKey(true)}
          />
          <Button title={"Показать"}/>
          <View>
            <TouchableOpacity activeOpacity={0.8} style={styles.boxButton} onPress={onLogin}>
                <Text style={styles.buttonText} >Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
        </View>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
    textAlign: 'center',
  },
  boxButton: {
    margin: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#FF6C00',
    margin: 16,
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  input: {
    background: '#F6F6F6',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    margin: 16,
    fontFamily: "Roboto-Regular",
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textAlign: 'center',
  },
});