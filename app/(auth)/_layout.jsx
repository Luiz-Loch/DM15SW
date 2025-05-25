import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from '../../scr/constants/Colors';
import { logger } from '../../scr/utils/logger';

export default function AuthLayout() {
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
                    name="login"
                    options={{
                        title: 'Entrar',
                        headerLeft: () => {
                            return <Ionicons
                                name="arrow-back"
                                size={24}
                                color={colorPalette.text}
                                style={{ marginLeft: 16 }}
                                onPress={() => {
                                    logger.log('Back button pressed in login screen');
                                    router.back()
                                }}
                            />
                        },
                    }}
                />
                <Stack.Screen
                    name="register"
                    options={{
                        title: 'Criar conta',
                        headerLeft: () => {
                            return <Ionicons
                                name="arrow-back"
                                size={24}
                                color={colorPalette.text}
                                style={{ marginLeft: 16 }}
                                onPress={() => {
                                    logger.log('Back button pressed in register screen');
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