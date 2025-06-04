import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme } from 'react-native';
import { MainButton } from '../scr/components/MainButton';
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

            <MainButton
                text="Login"
                onPress={() => {
                    logger.log('Navigating to /(auth)/login');
                    router.push('/(auth)/login')
                }}
                color={colorPalette.primary}
            />

            <MainButton
                text="Criar conta"
                onPress={() => {
                    logger.log('Navigating to /(auth)/register');
                    router.push('/(auth)/register')
                }}
                color={colorPalette.secondary}
            />

        </SafeAreaView >
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
});