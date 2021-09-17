import React, { useState, useEffect } from 'react';
import { YellowBox } from 'react-native'

import {
  ActionSheetSelectOptionIcon,
  
} from "../../../components";

import { BaseStyle } from "../../../config";

import { SafeAreaView, ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import SelectBox, { Item } from 'react-native-multi-selectbox-typescript'
import { xorBy } from 'lodash'

import api from '../../../services/api';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])



interface InvoiceDetailsRouteParams {
    customerId: number;
}

interface SalesPoint {
  id: number;
  name: string;
}

interface Customer {
  id: number;
  name?: string;
  vat?: string;
  cellphone1?: string;
  cellphone2?: string;
  latitude?: number;
  longitude?: number;
  sales_point?: SalesPoint
}


export default function CustomerData() {

  const navigation = useNavigation();
  const route = useRoute();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  
  const [money, setMoney] = useState(32000);

  const [customerId,setCustomerId] = useState(0);

  const params = route.params as InvoiceDetailsRouteParams;

  useEffect(() => {
    if (params.customerId) {
        setCustomerId(params.customerId);
    }
 }, [params.customerId]);

  async function handleCreateCustomer() {
    
    navigation.navigate('CustomerList');
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Nuit</Text>

      <Text style={styles.title}>Contactos</Text>

      <Text style={styles.label}>Telefone</Text>

      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
            <ListOptionSelected
                  style={{ marginTop: 20 }}
                  textLeft={t("type")}
                  textRight={optionChoosed?.text}
                  onPress={() => setModalVisible(true)}
              />
        </View>
      </ScrollView>

      <ActionSheetSelectOptionIcon
                isVisible={modalVisible}
                options={FTypes}
                onChange={onChangeOption}
                onSwipeComplete={() => setModalVisible(false)}
            />

      <RectButton style={styles.nextButton} onPress={handleCreateCustomer}>
        <Text style={styles.nextButtonText}>Gravar</Text>
      </RectButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15
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