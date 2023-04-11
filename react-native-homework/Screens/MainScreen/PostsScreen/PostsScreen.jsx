import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../../nestedScreens/DefauldScreen/DefauldScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";

const NestedScreen = createStackNavigator();


const PostsScreen = () => {
    return(
        <NestedScreen.Navigator>
            <NestedScreen.Screen name='DefaultScreen' component={DefaultScreen} />
            <NestedScreen.Screen name='Comments' component={CommentsScreen}/>
            <NestedScreen.Screen name='Map' component={MapScreen}/>
        </NestedScreen.Navigator>
    );
}

export default PostsScreen;