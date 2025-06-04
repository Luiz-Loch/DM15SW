import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from '../../constants/Colors';

export function PlantCard({ plant, onEdit, onDelete }) {
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    return (
        <View style={[styles.card, { backgroundColor: colorPalette.card }]}>
            <Image source={{ uri: plant.image }} style={styles.image} />\

            <View style={styles.info}>
                <View style={styles.header}>
                    <View style={styles.textSection}>
                        <Text style={[styles.name, { color: colorPalette.text }]}>{plant.name}</Text>
                        <Text style={[styles.subtext, { color: colorPalette.text }]}>
                            Regada {plant.lastWatered}
                        </Text>
                    </View>

                    <View style={styles.actions}>
                        <Pressable
                            onPress={() => onEdit(plant)}
                            style={({ pressed }) => [styles.iconButton, pressed && styles.buttonPressed]}
                        >
                            <Ionicons name="create-outline" size={20} color={colorPalette.primary} />
                        </Pressable>

                        <Pressable
                            onPress={() => onDelete(plant)}
                            style={({ pressed }) => [styles.iconButton, pressed && styles.buttonPressed]}
                        >
                            <Ionicons name="trash-outline" size={20} color="#e74c3c" />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.icons}>
                    <Pressable
                        onPress={() => console.log('water')}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}
                    >
                        <Ionicons name="water-outline" size={18} color={colorPalette.text} />
                    </Pressable>
                    <Pressable
                        onPress={() => console.log('sunny')}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}
                    >
                        <Ionicons name="sunny-outline" size={18} color={colorPalette.text} />
                    </Pressable>
                    <Pressable
                        onPress={() => console.log('warning')}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}
                    >
                        <Ionicons name="warning-outline" size={18} color={colorPalette.text} />
                    </Pressable>
                    <Pressable
                        onPress={() => console.log('heart')}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}>
                        <Ionicons name="heart-outline" size={18} color={colorPalette.text} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: 'flex-start',
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textSection: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 14,
        marginBottom: 4,
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 8,
    },
    iconButton: {
        padding: 4,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    icons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
});