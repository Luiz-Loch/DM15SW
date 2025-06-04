import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MainTitle } from '../../scr/components/MainTitle';
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
    }, []);


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <MainTitle title="Agenda" />

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
    calendarWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
    },
});