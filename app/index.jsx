import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, useColorScheme } from 'react-native';
import { Colors } from '../scr/constants/Colors';
import { logger } from '../scr/utils/logger';

export default function Home() {
    const theme = useColorScheme(); // 'light' ou 'dark'
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/index.jsx');
        logger.info('in function: Home');
        logger.log('Home screen mounted');
    }, []);


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <Text style={[styles.title, { color: colorPalette.text }]}>
                App de planta 🌱
            </Text>

            <Pressable
                onPress={() => {
                    logger.log('Navigating to /(auth)/login');
                    router.push('/(auth)/login')
                }}
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: colorPalette.primary },
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={[styles.buttonText, { color: colorPalette.buttonText }]}>
                    Login
                </Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    logger.log('Navigating to /(auth)/register');
                    router.push('/(auth)/register')
                }}
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: colorPalette.secondary },
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={[styles.buttonText, { color: colorPalette.buttonText }]}>
                    Criar conta
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        width: '80%',
        paddingVertical: 14,
        borderRadius: 12,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android fallback
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
});