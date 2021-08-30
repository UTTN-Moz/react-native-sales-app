import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import api from '../../../services/api';

interface CustomerDataRouteParams {
  position: {
    latitude: number,
    longitude: number
  }
}

interface Customer {
  id: number;
  name?: string;
  vat?: string;
  cellphone1?: string;
  cellphone2?: string;
  latitude?: number;
  longitude?: number;
}


export default function CustomerData() {

  const navigation = useNavigation();
  const route = useRoute();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [vat, setVat] = useState('');
  const [cellphone1, setCellphone1] = useState('');

  const [cellphone2, setCellphone2] = useState('');

  const params = route.params as CustomerDataRouteParams;

  async function handleCreateCustomer() {
    const { latitude, longitude } = params.position;

    const data: Customer = {
      id: 0,
      name,
      vat,
      latitude,
      longitude,
      cellphone1,
      cellphone2
    };

    await api.post('Customers', data);

    navigation.navigate('CustomerList');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Nuit</Text>
      <TextInput
        style={[styles.input]}
        value={vat}
        onChangeText={setVat}
        multiline
      />


      <Text style={styles.title}>Contactos</Text>

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={[styles.input]}
        multiline
        value={cellphone1}
        onChangeText={setCellphone1}
      />

      <Text style={styles.label}>Nr. Alternativo</Text>
      <TextInput
        style={styles.input}
        value={cellphone2}
        onChangeText={setCellphone2}
      />

      <RectButton style={styles.nextButton} onPress={handleCreateCustomer}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uplodImagesContainer: {
    flexDirection: 'row',
  },
  uploadImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})