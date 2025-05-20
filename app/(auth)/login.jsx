import { useState } from 'react';
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useUser } from '../../hooks/useUser';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { user, login } = useUser();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    const handleSubmit = async () => {
        setError(null);

        try {
            await login(email, password)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { backgroundColor: colorPalette.background }]}>
                <Text style={[styles.title, { color: colorPalette.text }]}>Login</Text>

                <TextInput
                    style={[styles.input, { backgroundColor: colorPalette.inputBackground, color: colorPalette.text }]}
                    placeholder="Email"
                    placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={[styles.input, { backgroundColor: colorPalette.inputBackground, color: colorPalette.text }]}
                    placeholder="Senha"
                    placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {error && <Text style={styles.error}>{error}</Text>}

                <Button title="Entrar" onPress={handleSubmit} />
            </View>
        </TouchableWithoutFeedback>
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
