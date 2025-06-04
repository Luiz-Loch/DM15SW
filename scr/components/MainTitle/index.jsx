import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export function MainTitle({ title }) {
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    return (
        <View>
            <Text style={[styles.title, { color: colorPalette.text }]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 40,
    },
});