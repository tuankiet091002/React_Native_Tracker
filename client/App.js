import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as AuthProvider } from "./src/contexts/AuthContext";
import { Provider as LocationProvider } from "./src/contexts/LocationContext";
import { Provider as TrackProvider } from "./src/contexts/TrackContext";
import { setNavigator } from "./src/navigationRef";
import AccountScreen from "./src/screens/AccountScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";

const Stack = createStackNavigator();
const LoginFlow = createStackNavigator();
const MainFlow = createMaterialBottomTabNavigator();
const TrackListFlow = createStackNavigator();

function TrackListFlowScreens() {
    return (
        <TrackListFlow.Navigator>
            <TrackListFlow.Screen
                name="TrackList"
                component={TrackListScreen}
                options={{ title: "Tracks", headerLeft: null }}
            />
            <TrackListFlow.Screen
                name="TrackDetail"
                component={TrackDetailScreen}
            />
        </TrackListFlow.Navigator>
    );
}

function LoginFlowScreens() {
    return (
        <LoginFlow.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <LoginFlow.Screen name="Signup" component={SignupScreen} />
            <LoginFlow.Screen name="Signin" component={SigninScreen} />
        </LoginFlow.Navigator>
    );
}

function MainFlowScreens() {
    return (
        <MainFlow.Navigator>
            <MainFlow.Screen
                name="TrackListFlow"
                component={TrackListFlowScreens}
                options={{
                    title: "Track Lists",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="th-list" size={24} color="black" />
                    ),
                }}
            />
            <MainFlow.Screen
                name="TrackCreate"
                component={TrackCreateScreen}
                options={{
                    title: "Add Track",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="plus" size={24} color="black" />
                    ),
                }}
            />
            <MainFlow.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    title: "Account",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="gear" size={24} color="black" />
                    ),
                }}
            />
        </MainFlow.Navigator>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <LocationProvider>
                <TrackProvider>
                    <NavigationContainer
                        ref={(navigator) => setNavigator(navigator)}
                    >
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="ResolveAuth"
                                component={ResolveAuthScreen}
                            />
                            <Stack.Screen
                                name="LoginFlow"
                                component={LoginFlowScreens}
                            />
                            <Stack.Screen
                                name="MainFlow"
                                component={MainFlowScreens}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </TrackProvider>
            </LocationProvider>
        </AuthProvider>
    );
}
