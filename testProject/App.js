import React from "react";
import HomeScreen from "./screens/home";
import DetailMovieScreen from "./screens/detailMovie";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params.Title || "Detail Movie",
          })}
          name="detailMovie"
          component={DetailMovieScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
