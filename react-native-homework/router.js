import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { TouchableOpacity } from "react-native";

import RegistrationScreen from './Screens/authScreens/RegistrationScreen';
import LoginScreen from './Screens/authScreens/LoginScreen';
import PostsScreen from './Screens/MainScreen/PostsScreen';
import CreatePostScreen from './Screens/MainScreen/CreatePostsScreen';
import ProfileScreen from './Screens/MainScreen/ProfileScreen';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { useDispatch } from "react-redux";
import { authSignOutUser } from "./redux/auth/authOperations";

export const useRoute = (isAuth) => {
    dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
    };

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
        <TouchableOpacity style={{ marginRight: 20 }} onPress={signOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
    ),
    headerTitle: "Публікації",}}
    name='Posts' component={PostsScreen}/>
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


