import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { FooterButton } from '../../../scr/components/FooterButton';
import { MainTitle } from '../../../scr/components/MainTitle';
import { Colors } from '../../../scr/constants/Colors';
import { usePlants } from '../../../scr/hooks/usePlants';
import { logger } from '../../../scr/utils/logger';

export default function AddPlant() {
    const { addPlant } = usePlants();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sun, setSun] = useState('low');

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/plants/add.jsx');
        logger.log('in function: AddPlant');
        logger.log('add plant screen mounted');
    }, []);

    function handleAddPlant() {
        if (!name.trim()) {
            alert('Nome da planta é obrigatório!');
            return;
        }

        addPlant(name, description, sun);

        setName('');
        setDescription('');
        setSun('low');
        logger.log(`Plant with name "${name}" added with description "${description}" and sun level "${sun}"`);

        router.back();
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <MainTitle title="Criar planta" />

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
                text="Criar planta"
                onPress={() => {
                    handleAddPlant();
                }}
                color={colorPalette.primary}
            />
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
