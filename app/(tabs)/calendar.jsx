import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MainTitle } from '../../scr/components/MainTitle';
import { Colors } from '../../scr/constants/Colors';
import { usePlants } from '../../scr/hooks/usePlants';
import { logger } from '../../scr/utils/logger';

export default function CalendarScreen() {
    const { plants } = usePlants();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];
    const [markedDates, setMarkedDates] = useState({});

    const onDayPress = (day) => {
        logger.log('Pressed on:', day.dateString);
    };

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/calendar.jsx');
        logger.log('in function: CalendarScreen');
        logger.log('Calendar screen mounted');
    }, []);

    useEffect(() => {
        const newMarkedDates = {};

        plants.forEach((plant) => {
            plant.watered.forEach((dateString) => {
                const formattedDate = new Date(dateString).toISOString().split('T')[0]; // "YYYY-MM-DD"

                newMarkedDates[formattedDate] = {
                    marked: true,
                    dotColor: '#4da6ff',
                    activeOpacity: 0,
                };
            });
        });

        setMarkedDates(newMarkedDates);
    }, [plants]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <MainTitle title="Agenda" />

            <View style={styles.calendarWrapper}>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    theme={{
                        calendarBackground: colorPalette.background,
                        textSectionTitleColor: colorPalette.text,
                        dayTextColor: colorPalette.text,
                        todayTextColor: '#00adf5',
                        selectedDayBackgroundColor: '#00adf5',
                        monthTextColor: colorPalette.text,
                        textSectionTitleColor: colorPalette.text,
                        arrowColor: colorPalette.text,
                        monthTextColor: colorPalette.text,
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