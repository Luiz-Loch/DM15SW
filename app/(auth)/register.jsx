import { useState } from 'react';
import { Button, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import { Colors } from '../../scr/constants/Colors';
import { useUser } from '../../scr/hooks/useUser';
import { logger } from '../../scr/utils/logger';


export default function Register() {
    logger.info('in file: ./app/(auth)/register.jsx');
    logger.log('in function: Register');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const { user, register } = useUser();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    logger.info('Theme is: ', theme);
    logger.log('Register screen rendered');
    logger.log('Current user is: ', user);


    const handleSubmit = async () => {
        logger.log('In function: Register.handleSubmit');
        logger.log('Register submit triggered with email:', email);

        setError(null)
        if (password !== confirmPassword) {
            logger.error('Passwords do not match');
            setError("As senhas não coincidem")
            return
        }
        if (password.length < 6) {
            logger.error('Password must be at least 6 characters');
            setError("A senha deve ter pelo menos 6 caracteres")
            return
        }
        if (!email || !password) {
            logger.error('Email and password are required');
            setError("Preencha todos os campos")
            return
        }
        if (!email.includes('@')) {
            logger.error('Invalid email format');
            setError("Email inválido")
            return
        }

        logger.info('Attempting registration with email:', email);
        try {
            logger.log('Calling register()');
            await register(email, password);
            logger.info('Register successful');
            logger.log('Current user is: ', user);
        } catch (error) {
            setError(error.message);
            logger.error('Login failed:', error.message);
            logger.debug('Registration error object:', error);
        }
    }

    return (
        <SafeAreaView style={[{ flex: 1 }, { backgroundColor: colorPalette.background }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { backgroundColor: colorPalette.background }]}>
                    <Text style={[styles.title, { color: colorPalette.text }]}>Criar conta</Text>

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

                    <TextInput
                        style={[styles.input, { backgroundColor: colorPalette.inputBackground, color: colorPalette.text }]}
                        placeholder="Confirme a senha"
                        placeholderTextColor={colorPalette.placeholder}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    {error && <Text style={styles.error}>{error}</Text>}

                    <Button
                        title="Criar conta"
                        onPress={handleSubmit}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
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