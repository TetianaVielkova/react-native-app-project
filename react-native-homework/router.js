import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';

import PostScreen from './Screens/MainScreen/PostsScreen/PostsScreen';
import CreatePostScreen from './Screens/MainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from './Screens/MainScreen/ProfileScreen/ProfileScreen';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 


export const useRoute = (isAuth) => {
    if (!isAuth) {
        return <MainStack.Navigator>
            <MainStack.Screen options={{ headerShown: false }} name="Registration" component={RegistrationScreen} />
            <MainStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        </MainStack.Navigator>
    }
    return <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={26} color="color" />)}}
            name='Posts' component={PostScreen}/>
            <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={32} color="color" />)}}
            name='Create' component={CreatePostScreen}/>
            <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={32} color="color" />)}}
            name='Profile' component={ProfileScreen}/>
        </MainTab.Navigator>
    }
