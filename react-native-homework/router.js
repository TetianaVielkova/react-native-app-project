import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { TouchableOpacity } from "react-native";

import RegistrationScreen from './Screens/authScreens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/authScreens/LoginScreen/LoginScreen';
import PostScreen from './Screens/MainScreen/PostsScreen/PostsScreen';
import CreatePostScreen from './Screens/MainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from './Screens/MainScreen/ProfileScreen/ProfileScreen';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return  <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen options={{ headerShown: false }} name="Registration" component={RegistrationScreen} />
            <AuthStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    }  
    return <MainTab.Navigator initialRouteName="Posts" screenOptions={{ tabBarShowLabel: false, tabBarActiveBackgroundColor: "#FF6C00", tabBarItemStyle: {borderRadius: 30, } }} >
    <MainTab.Screen options={{
    tabBarIcon: ({ focused, size, color }) => (
    <AntDesign name="appstore-o"  size={26} color="color" />),
    headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
    },
    headerRight: () => (
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("Login")}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
    ),
    headerTitle: "Публікації",}}
    name='Posts' component={PostScreen}/>
    <MainTab.Screen options={{
    tabBarIcon: ({ focused, size, color }) => (
    <AntDesign name="plus"  size={32} color="color" />),
    headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
    },
    headerTitle: "Створити публікацію"}}
    name='Create' component={CreatePostScreen}/>
    <MainTab.Screen options={{
    tabBarIcon: ({ focused, size, color }) => (
    <Feather name="user"  size={32} color="color" />),
    headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
    },}}
    name='Профіль' component={ProfileScreen}/>
</MainTab.Navigator>}


