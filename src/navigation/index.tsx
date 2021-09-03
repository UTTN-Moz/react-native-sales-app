import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Platform, StatusBar, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BaseSetting, useTheme } from "../config";

import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

//const { Navigator, Screen } = createStackNavigator();

import { AllScreens, CustomerTabScreens, CustomerScreens } from "./config";

import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import { store } from "../store";

import Header from '../components/Header';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainScreens = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,

            }}
        >
            {Object.keys(AllScreens).map((name, index) => {
                const { component, options } = AllScreens[name];
                return (
                    <MainStack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </MainStack.Navigator>
    );
};

const Navigator = (props: any) => {

    const { theme, colors } = useTheme();
    const isDarkMode = useColorScheme() === "dark";
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigationRef = useRef(null);

    useEffect(() => {
        // Config status bar
        if (Platform.OS == "android") {
            StatusBar.setBackgroundColor(colors.primary, true);
        }
        StatusBar.setBarStyle(
            isDarkMode ? "light-content" : "dark-content",
            true
        );
        const onProcess = async () => {
            // Lazy loady Font
            await Font.loadAsync(BaseSetting.resourcesFont);

        };
        onProcess();
    }, []);

    const goToApp = (name) => {
        navigationRef?.current?.navigate(name);
    };

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <AppearanceProvider>
                <NavigationContainer theme={theme} ref={navigationRef}>
                    <RootStack.Navigator
                        initialRouteName="Loading"
                        screenOptions={{
                            headerShown: false,
                            cardStyle: { backgroundColor: "transparent" },
                            cardOverlayEnabled: true,
                            cardStyleInterpolator: ({
                                current: { progress },
                            }) => ({
                                cardStyle: {
                                    opacity: progress.interpolate({
                                        inputRange: [0, 0.5, 0.9, 1],
                                        outputRange: [0, 0.25, 0.7, 1],
                                    }),
                                },
                                overlayStyle: {
                                    opacity: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 0.5],
                                        extrapolate: "clamp",
                                    }),
                                },
                            }),
                        }}
                        mode="modal"
                    >
                        <RootStack.Screen
                            name="MainScreens"
                            component={MainScreens}
                            options={{ headerShown: false }}
                        />
                        {/* {Object.keys(ModalScreens).map((name, index) => {
                            const { component, options } = ModalScreens[name];
                            return (
                                <RootStack.Screen
                                    key={name}
                                    name={name}
                                    component={component}
                                    options={options}
                                />
                            );
                        })} */}
                    </RootStack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
            {/* {!loading && <AssistiveTouch goToApp={goToApp} />} */}
        </View>
    );
}
export default Navigator;