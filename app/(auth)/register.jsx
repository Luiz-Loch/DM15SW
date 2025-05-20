import { Link } from 'expo-router';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { useUser } from '../../hooks/useUser';

import { Colors } from '../../constants/Colors';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { user, register } = useUser()

    const handleSubmit = async () => {
        setError(null)

        try {
            await register(email, password)
            console.log('current user is: ', user)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
})