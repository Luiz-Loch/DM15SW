import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { FooterButton } from '../../../scr/components/FooterButton';
import { MainTitle } from '../../../scr/components/MainTitle';
import { Colors } from '../../../scr/constants/Colors';
import { usePlants } from '../../../scr/hooks/usePlants';
import { logger } from '../../../scr/utils/logger';

export default function EditPlant() {
    const { id } = useLocalSearchParams();
    const { plants, editPlant } = usePlants();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];
    const [name, setName] = useState(plants.find(plant => plant.id === id)?.name || '');
    const [description, setDescription] = useState(plants.find(plant => plant.id === id)?.description || '');
    const [sun, setSun] = useState(plants.find(plant => plant.id === id)?.sun || 'low');

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/plants/[id].jsx');
        logger.log('in function: EditPlant');
        logger.log('edit plant screen mounted');
    }, []);

    function handleSave() {
        logger.log('In function: EditPlant.handleSave');
        logger.log('Editing plant with id:', id);
        logger.log('New name:', name);
        logger.log('New description:', description);
        logger.log('New sun value:', sun);

        if (!name) {
            logger.error('Name is required');
            return;
        }

        editPlant(id, name, description, sun);
        logger.info('Plant edited successfully');
        router.back();
    }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>
                    <MainTitle title="Editar Planta" />

                    <View style={styles.form}>
                        <Text style={[styles.label, { color: colorPalette.text }]}>Nome</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colorPalette.inputBackground, color: colorPalette.text }]}
                            placeholder="Ex: Zamioculca"
                            placeholderTextColor={colorPalette.placeholder}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={[styles.label, { color: colorPalette.text }]}>Descrição</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colorPalette.inputBackground, color: colorPalette.text }]}
                            placeholder="Ex: Planta resistente à sombra"
                            placeholderTextColor={colorPalette.placeholder}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />

                        <Text style={[styles.label, { color: colorPalette.text }]}>Sol</Text>
                        <Picker
                            selectedValue={sun}
                            onValueChange={setSun}
                            style={{ color: colorPalette.text }}
                        >
                            <Picker.Item label="Pouco sol" value="low" />
                            <Picker.Item label="Sol médio" value="medium" />
                            <Picker.Item label="Muito sol" value="high" />
                        </Picker>
                    </View>

                    <FooterButton
                        text="Salvar"
                        onPress={() => {
                            handleSave();
                        }}
                        color={colorPalette.primary}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    form: {
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 24,
        width: '90%',
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
});
