import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

export function MainButton({ text, onPress, color }) {
    const theme = useColorScheme(); // 'light' ou 'dark'
    const colorPalette = Colors[theme || 'light'];

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: color },
                pressed && styles.buttonPressed,
            ]}
        >
            <Text style={[styles.buttonText, { color: colorPalette.buttonText }]}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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
});;