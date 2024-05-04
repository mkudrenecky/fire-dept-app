import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import InspectionFormScreen from "./components/InspectionFormScreen";
import LandingScreen from "./components/LandingScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="InspectionForm"
            component={InspectionFormScreen}
          />
          <Stack.Screen name="Landing" component={LandingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
