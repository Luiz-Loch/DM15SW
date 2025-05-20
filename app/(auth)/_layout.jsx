import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from '../../constants/Colors';

export default function AuthLayout() {
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];
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
                                onPress={() => router.back()}
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
                                onPress={() => router.back()}
                            />
                        },
                    }}
                />
            </Stack>
        </>
    );
}