import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GameProvider } from "./src/contexts/GameContext";
import { GameScreen } from "./src/screens/GameScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ScoreScreen } from "./src/screens/ScoreScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Score" component={ScoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
