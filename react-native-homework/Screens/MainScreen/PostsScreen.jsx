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
          options={{title: "Публікації", headerStyle: {height: 0}}}/>
          <NestedScreen.Screen name='Comments' component={CommentsScreen} options={{title: "Коментарі"}}/>
          <NestedScreen.Screen name='Map' component={MapScreen} options={{title: "Мапа"}}/>
      </NestedScreen.Navigator>
)}

export default PostsScreen;