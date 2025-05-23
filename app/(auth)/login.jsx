import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { Colors } from '../../scr/constants/Colors';
import { useUser } from '../../scr/hooks/useUser';
import { logger } from '../../scr/utils/logger';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { user, login } = useUser();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(auth)/login.jsx');
        logger.log('in function: Login');
        logger.info('Theme is: ', theme);
        logger.log('Login screen mounted');
        logger.log('Current user is: ', user);
    }, []);

    const handleSubmit = async () => {
        logger.log('In function: Login.handleSubmit');
        logger.log('Login submit triggered with email:', email);
        setError(null);

        logger.info('Attempting login with email:', email);
        try {
            logger.log('Calling login()');
            await login(email, password);
            logger.info('Login successful');
            logger.log('Current user is: ', user);
            router.replace('/(tabs)/plants');
        } catch (error) {
            setError(error.message)
            logger.error('Login failed:', error.message);
            logger.debug('Login error object:', error);
        }
    }

    return (
        <SafeAreaView style={[{ flex: 1 }, { backgroundColor: colorPalette.background }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { backgroundColor: colorPalette.background }]}>
                    <Text style={[styles.title, { color: colorPalette.text }]}>Login</Text>

                    <TextInput
                        style={[styles.input, { backgroundColor: colorPalette.inputBackground, color: colorPalette.text }]}
                        placeholder="Email"
                        placeholderTextColor={colorPalette.placeholder}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={[styles.input, { backgroundColor: colorPalette.inputBackground, color: colorPalette.text }]}
                        placeholder="Senha"
                        placeholderTextColor={colorPalette.placeholder}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {error && <Text style={styles.error}>{error}</Text>}

                    <Button
                        title="Entrar"
                        onPress={handleSubmit}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    error: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
});
