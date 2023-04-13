import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreens/DefaultScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();


const PostsScreen = () => {
    return(
        <NestedScreen.Navigator>
            <NestedScreen.Screen name='DefaultScreen'  component={DefaultScreen} 
            options={{headerStyle: {height: 0}}}/>
            <NestedScreen.Screen name='Comments' component={CommentsScreen}/>
            <NestedScreen.Screen name='Map' component={MapScreen}/>
        </NestedScreen.Navigator>
    );
}

export default PostsScreen;