import React, { useState, useEffect } from 'react';

import {
  ActionSheetSelectOptionIcon,

} from "../../../components";

import { BaseStyle } from "../../../config";

import { Modal, FlatList, Pressable, SafeAreaView, ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import SelectBox, { Item } from 'react-native-multi-selectbox-typescript'
import { xorBy } from 'lodash'

import api from '../../../services/api';

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

interface Items {
  id?: number;
  code?: string;
  description?: string;
  quantity?: number;
  price?: number;
  amount?: number;
}

interface ProductItem {
  id: string | number;
  item: string;
}

export default function CustomerData() {

  const navigation = useNavigation();
  const route = useRoute();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');

  const [nuit, setNuit] = useState('');

  const [money, setMoney] = useState(32000);

  const [customerId, setCustomerId] = useState(0);

  const [items, setItems] = useState<Items[]>([]);

  const [products, setProducts] = useState<ProductItem[]>([]);
  const params = route.params as InvoiceDetailsRouteParams;

  const [modalVisible, setModalVisible] = useState(false);

  const [product, setProduct] = useState();
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (params.customerId) {
      setCustomerId(params.customerId);
    }
  }, [params.customerId]);

  useFocusEffect(() => {
    api.get('products').then(response => {
      const prod = response.data.map((p) => {
        return {
          id: p.id,
          item: p.name
        }
      })
      setProducts(prod);
    });
  })

  async function handleCreateCustomer() {

    navigation.navigate('CustomerList');
  }

  const renderItem = ({ item }) => (
    <Item id={item.id} title={item.description} />
  );

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const Item = ({ id, title }) => (
    <View style={styles.item}>
      <Text style={styles.title}  >
        {title}
      </Text>
    </View>
  );

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
        style={styles.input}
        value={nuit}
        onChangeText={setNuit}
      />
      <Text style={styles.label}>Total</Text>

      <TextInput
        style={styles.input}
        value={nuit}
        onChangeText={setNuit}
      />

      <Text style={styles.title}>Recargas</Text>

      <RectButton style={styles.nextButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.nextButtonText}>+ Recarga</Text>
      </RectButton>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item: Item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
              <Text style={styles.modalText}>Recarga</Text>

              <SelectBox
                label="Recarga"
                options={products}
                value={product}
                onChange={(i: Item) => setProduct(i)}
                hideInputFilter={false}
              />

              <Text style={styles.modalText}>Preço</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
              />
              <Text style={styles.modalText}>Quantidade</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
              />
              <Text style={styles.modalText}>Total</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
              />


              <Pressable
                style={[styles.nextButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Adicionar</Text>
              </Pressable>

              <Pressable
                style={[styles.nextButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <RectButton style={styles.nextButton} onPress={handleCreateCustomer}>
        <Text style={styles.nextButtonText}>Gravar</Text>
      </RectButton>
    </ScrollView>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})