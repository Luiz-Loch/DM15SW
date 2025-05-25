import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '../../scr/constants/Colors';
import { useUser } from '../../scr/hooks/useUser';
import { logger } from '../../scr/utils/logger';

export default function CalendarScreen() {
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];
    const { user } = useUser(); // Uncomment if you need user data

    const [markedDates, setMarkedDates] = useState({
        '2025-05-10': { marked: true, dotColor: 'green', activeOpacity: 0 },
        '2025-05-15': { marked: true, dotColor: 'blue', activeOpacity: 0 },
        '2025-05-18': { marked: true, dotColor: 'orange', activeOpacity: 0 },
    });

    const onDayPress = (day) => {
        logger.log('Pressed on:', day.dateString);
    };

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/calendar.jsx');
        logger.log('in function: CalendarScreen');
        logger.log('Calendar screen mounted');
        logger.log('Current user is: ', user);
    }, []);


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <Text style={[styles.pageTitle, { color: colorPalette.text }]}>Agenda</Text>

            <View style={styles.calendarWrapper}>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    theme={{
                        calendarBackground: colorPalette.background,
                        dayTextColor: colorPalette.text,
                        monthTextColor: colorPalette.text,
                        textSectionTitleColor: colorPalette.text,
                        selectedDayBackgroundColor: '#00adf5',
                        todayTextColor: '#00adf5',
                        arrowColor: colorPalette.text,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 40,
    },
    calendarWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
    },
});