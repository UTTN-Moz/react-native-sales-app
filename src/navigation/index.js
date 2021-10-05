import { ApplicationActions } from "@actions";
import { AssistiveTouch } from "@components";
import { BaseSetting, useTheme } from "@config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { languageSelect } from "@selectors";
import * as Utils from "@utils";
import i18n from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { initReactI18next } from "react-i18next";
import { Platform, StatusBar, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AllScreens, ModalScreens } from "./config";
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
import { StackActions } from "@react-navigation/native";
import * as Font from "expo-font";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

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

const Navigator = (props) => {
    const { theme, colors } = useTheme();
    const isDarkMode = useColorScheme() === "dark";
    const language = useSelector(languageSelect);
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
            // Get current language of device
            const languageCode = language ?? BaseSetting.defaultLanguage;
            dispatch(ApplicationActions.onChangeLanguage(languageCode));
            // Config language for app
            await i18n.use(initReactI18next).init({
                resources: BaseSetting.resourcesLanguage,
                lng: languageCode,
                fallbackLng: languageCode,
            });
            setTimeout(() => {
                Utils.enableExperimental();
                setLoading(false);
                navigationRef?.current?.dispatch(
                    StackActions.replace("MaziHome")
                );
            }, 300);
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
                        {Object.keys(ModalScreens).map((name, index) => {
                            const { component, options } = ModalScreens[name];
                            return (
                                <RootStack.Screen
                                    key={name}
                                    name={name}
                                    component={component}
                                    options={options}
                                />
                            );
                        })}
                    </RootStack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
            {!loading && <AssistiveTouch goToApp={goToApp} />}
        </View>
    );
};

export default Navigator;
