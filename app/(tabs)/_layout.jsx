import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from 'react-native';
import { Colors } from "../../scr/constants/Colors";
import { logger } from "../../scr/utils/logger";

export default function TabsLayout() {
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(auth)/_layout.jsx');
        logger.log('in function: AuthLayout');
        logger.log('AuthLayout screen rendered');
        logger.log('Auth stack initialized with login and register screens');
    }, []);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'green',
                headerShown: false,
                tabBarActiveTintColor: colorPalette.activeTintColor,
                tabBarInactiveTintColor: colorPalette.inactiveTintColor,
                tabBarStyle: {
                    backgroundColor: colorPalette.background,
                    borderTopColor: colorPalette.tabBarBorderTopColor,
                },
            }}
        >
            <Tabs.Screen
                name="plants/index"
                options={{
                    title: "Plantas",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="leaf-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="plants/[id]"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Agenda",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
