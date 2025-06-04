import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme } from 'react-native';
import { FooterButton } from '../../../scr/components/FooterButton';
import { MainTitle } from '../../../scr/components/MainTitle';
import { Colors } from '../../../scr/constants/Colors';
import { useUser } from '../../../scr/hooks/useUser';
import { logger } from '../../../scr/utils/logger';

export default function EditPlant() {
    const { id } = useLocalSearchParams();
    const { user } = useUser();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/plants/[id].jsx');
        logger.log('in function: EditPlant');
        logger.log('edit plant screen mounted');
    }, []);

    return (
        <SafeAreaView>
            <MainTitle title="Editar Planta" />
            <Text>Plant with id {id}</Text>


            <FooterButton
                text="Salvar"
                onPress={() => {
                    // Implement save logic here
                    logger.log('Save button pressed for plant with id:', id);
                }}
                color={colorPalette.primary}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});