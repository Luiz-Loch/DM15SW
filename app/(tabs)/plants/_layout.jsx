import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from '../../../scr/constants/Colors';
import { logger } from '../../../scr/utils/logger';

export default function PlantsStackLayout() {
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/plants/_layout.jsx');
        logger.log('in function: PlantsStackLayout');
    }, []);

    return (
        <>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: colorPalette.background },
                    headerTintColor: colorPalette.text,
                    headerTitleStyle: { fontWeight: 'bold' },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="add"
                    options={{
                        title: '',
                        // headerShown: false,
                        headerLeft: () => {
                            return <Ionicons
                                name="arrow-back"
                                size={24}
                                color={colorPalette.text}
                                style={{ marginLeft: 16 }}
                                onPress={() => {
                                    router.back()
                                }}
                            />
                        },
                    }}
                />
                <Stack.Screen
                    name="[id]"
                    options={{
                        title: '',
                        headerLeft: () => {
                            return <Ionicons
                                name="arrow-back"
                                size={24}
                                color={colorPalette.text}
                                style={{ marginLeft: 16 }}
                                onPress={() => {
                                    router.back()
                                }}
                            />
                        },
                    }}
                />
            </Stack>
        </>
    );
}