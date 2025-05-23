import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from '../../scr/constants/Colors';
import { useUser } from '../../scr/hooks/useUser';
import { logger } from '../../scr/utils/logger';

export default function Profile() {
    const { user, logout } = useUser();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/profile.jsx');
        logger.log('in function: Profile');
        logger.info('Theme is: ', theme);
        logger.log('profile screen mounted');
        logger.log('Current user is: ', user);
    }, []);

    const handleLogout = async () => {
        logger.log('in function: Profile.handleLogout');
        logger.log('Logging out user:', user);
        try {
            await logout();
            logger.info('Logout successful');
            router.replace('/index');
        } catch (error) {
            logger.error('Logout failed:', error.message);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <Text style={[styles.title, { color: colorPalette.text }]}>Perfil</Text>

            <View style={styles.infoContainer}>
                <Text style={[styles.infoText, { color: colorPalette.text }]}>Email:{"\t"}{user.email}</Text>
                <Text style={[styles.infoText, { color: colorPalette.text }]}>ID:{"\t\t"}{user.id}</Text>
                {/* Adicione mais campos se necessário */}
            </View>

            <View style={styles.bottomContainer}>
                <Pressable
                    onPress={() => {
                        logger.log('Logout button pressed');
                        handleLogout();
                    }}
                    style={({ pressed }) => [
                        styles.logoutButton,
                        { backgroundColor: pressed ? '#d63031' : '#e74c3c' },
                        pressed && styles.buttonPressed,
                    ]}
                >
                    <Text style={[styles.logoutText, { color: colorPalette.buttonText }]}>
                        Sair
                    </Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 40,
    },
    infoContainer: {
        marginBottom: 32,
        alignItems: 'flex-start',
    },
    infoText: {
        fontSize: 20,
        margin: 10,
        marginBottom: 8,
    },
    bottomContainer: {
        marginTop: 'auto',
        alignItems: 'center',
        paddingBottom: 32,
    },
    logoutButton: {
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
    logoutText: {
        fontSize: 17,
        fontWeight: '500',
    },
});
