import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from '../constants/Colors';

export function PlantCard({
    plant,
    onEdit,
    onDelete,
    onWaterPress,
    onSunPress,
    onWarningPress,
    onHeartPress,
}) {
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    if (plant.watered.length > 0) {
        const lastWatered = plant.watered[plant.watered.length - 1];
        const wasWateredToday = isToday(new Date(lastWatered));
    }
    else {
        var wasWateredToday = false;
    }

    if (plant.warning.length > 0) {
        const lastWarning = plant.warning[plant.warning.length - 1].date;
        const wasWarnedToday = isToday(new Date(lastWarning));
    }
    else {
        var wasWarnedToday = false;
    }

    function isToday(date) {
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    return (
        <View style={[styles.card, { backgroundColor: colorPalette.card }]}>
            <Image source={{ uri: plant.image }} style={styles.image} />

            <View style={styles.info}>
                <View style={styles.header}>
                    <View style={styles.textSection}>
                        <Text style={[styles.name, { color: colorPalette.text }]}>{plant.name}</Text>

                        {plant.watered.length > 0 && (
                            <Text style={[styles.subtext, { color: colorPalette.text }]}>
                                Regada {new Date(plant.watered[plant.watered.length - 1]).toLocaleDateString('pt-BR')}
                            </Text>
                        )}
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
                        onPress={() => onWaterPress(plant)}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}
                    >
                        <Ionicons
                            name={wasWateredToday ? 'water' : 'water-outline'}
                            size={18}
                            color={wasWateredToday ? '#4da6ff' : colorPalette.text}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => onSunPress(plant)}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}
                    >
                        <Ionicons
                            name={'sunny'}
                            size={18}
                            color={
                                plant.sun === 'low' ? '#cccc00' :
                                    plant.sun === 'medium' ? '#ffaa00' :
                                        '#ff8000' // high
                            }
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => onWarningPress(plant)}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}
                    >
                        <Ionicons
                            name={wasWarnedToday ? 'warning' : 'warning-outline'}
                            size={18}
                            color={wasWarnedToday ? '#ff6b6b' : colorPalette.text}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => onHeartPress(plant)}
                        style={({ pressed }) => [pressed && styles.buttonPressed]}>
                        <Ionicons
                            name={plant.favorite ? 'heart' : 'heart-outline'}
                            size={18}
                            color={plant.favorite ? '#ff5b8c' : colorPalette.text}
                        />
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