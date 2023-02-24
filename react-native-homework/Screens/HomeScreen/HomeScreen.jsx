import React from "react";
const MainTab = createBottomTabNavigator();

import PostScreen from './../MainScreen/PostsScreen/PostsScreen';
import CreatePostScreen from './../MainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from './../MainScreen/ProfileScreen/ProfileScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
 

const HomeScreen = () => {
    return(
        <MainTab.Navigator initialRouteName="Posts" screenOptions={{ tabBarShowLabel: false, tabBarActiveBackgroundColor: "#FF6C00", tabBarItemStyle: {borderRadius: 20, } }} >
            <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o"  size={26} color="color" />),
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
            },}}
            name='Posts' component={PostScreen}/>
            <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus"  size={32} color="color" />),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("Login")}>
                    <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
            },}}
            name='Create' component={CreatePostScreen}/>
            <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user"  size={32} color="color" />),
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
            },}}
            name='Profile' component={ProfileScreen}/>
        </MainTab.Navigator>
    )
}

export default HomeScreen;