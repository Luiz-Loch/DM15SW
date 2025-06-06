import { StyleSheet, View } from "react-native";
import { MainButton } from "./MainButton";

export function FooterButton({ text, onPress, color }) {
    return (
        <View style={styles.container}>
            <MainButton
                text={text}
                onPress={onPress}
                color={color}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 'auto',
        alignItems: 'center',
        paddingBottom: 32,
    },
});