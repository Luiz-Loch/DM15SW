import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { FooterButton } from '../../scr/components/FooterButton';
import { MainTitle } from '../../scr/components/MainTitle';
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
        logger.log('profile screen mounted');
    }, []);

    useEffect(() => {
        if (!user) {
            logger.info('No user found. Redirecting to index.');
            router.replace('/');
        }
    }, [user]);

    const handleLogout = async () => {
        logger.log('in function: Profile.handleLogout');
        try {
            await logout();
            logger.info('Logout successful');
        } catch (error) {
            logger.error('Logout failed:', error.message);
        }
    };

    if (!user) {
        // If user is not defined, we can return null so that the component does not render anything.
        // And so, do not show the profile screen.
        // This is used to prevent error while user is not logged in.
        return null;
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>

            <MainTitle title="Perfil" />

            <View style={styles.infoContainer}>
                <Text style={[styles.infoText, { color: colorPalette.text }]}>Email:{"\t"}{user.email}</Text>
                {/* Outros dados podem ser adicionado aqui */}
            </View>

            <FooterButton
                text="Sair"
                onPress={() => {
                    handleLogout();
                }}
                color={'#e74c3c'}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
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
});
