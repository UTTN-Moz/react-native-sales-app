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
import NumericInput from 'react-native-numeric-input'

import { xorBy } from 'lodash'
import * as numbers from '../../../functions/numbers'

import api from '../../../services/api';

// interface InvoiceDetailsRouteParams {
//   customerId: number;
// }

// interface SalesPoint {
//   id: number;
//   name: string;
// }

// interface Customer {
//   id: number;
//   name?: string;
//   customer?:string;
//   vat?: string;
//   cellphone1?: string;
//   cellphone2?: string;
//   latitude?: number;
//   longitude?: number;
//   sales_point?: SalesPoint
// }

// interface LineItem {
//   id: number;
//   description?: string;
//   quantity: number;
//   vat?:number;
//   discount?:number;
//   price: number;
//   amount: number;

//   barcode1?: string;
//   barcode2?: string;
 
//   product?: ProductItem;
// }

// interface ProductItem {
//   id: string;
//   code?:string;
//   name: string;
//   price: number;
// }

export default function CustomerData() {

  const navigation = useNavigation();
  const route = useRoute();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');

  const [vat, setVat] = useState('');

  const [money, setMoney] = useState(0);

  const [customer, setCustomer] = useState();

  const [customerId, setCustomerId] = useState(0);

  const [lineItems, setLineItems] = useState([]);
  
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState();

  const [products, setProducts] = useState([]);
  
  const [total, setTotal] = useState('');

  const params = route.params ;

  const [modalVisible, setModalVisible] = useState(false);  

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalR, setTotalR] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {

    api.get(`customers/${params.customerId}`).then(response => {

      setCustomer(response.data);
      setCustomerId(response.data.id);
      setName(response.data.name || "");
      setVat(response.data.vat || "");
      
    })

    api.get('products').then(response => {
      const prod = response.data

      const prodList = prod?.map((p) => {
        return {
          id: p.id,
          item: p.name
        }
      })

      setProductList(prodList) 
      setProducts(prod);
    });
  }, [params.customerId]);

  useEffect(() => {
    let totalI = lineItems.reduce((acc, item) => {
      return acc + item.amount;
    }, 0)
    const totalInv = (totalI - (totalI * discount * 0.01))
    setTotal( numbers.formatNumber(totalInv) );
    setTotalR( numbers.formatNumber(totalI));
    setTotalAmount(totalI)
  }, [lineItems]);

  useEffect(() => {
    let totalP = price * quantity
    setAmount(totalP.toString());
  }, [price])

  useEffect(() => {
    let totalP = price * quantity
    setAmount(totalP.toString());
  }, [quantity])

  const renderItem = ({item}) => (

    <View style={styles.item}>
          <Text>
              {item.description} - preço: {item.price} - qnt: {item.quantity} - total: {numbers.formatNumber(item.amount) }
          </Text>
      </View>
    // <Item id={item.id} title={item.description} />
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

  function handlerSelectProduct(item) 
  {
    setProduct(item);
    
    let selProd = products.find(p => p.id == item.id.toString()) ;

    if(!!selProd){
      let amountP = price * quantity
      setQuantity(1)
      setPrice(selProd.price)
      setAmount(numbers.formatNumber(amountP));
    }    
  }

  async function handleSave() {

    let totalI = lineItems.reduce((acc, item) => {
      return acc + item.amount;
    }, 0)

    let totalVat = lineItems.reduce((acc, item) => {
      return acc + (item.vat ||0);
    }, 0)

    let invoice = {
      type: 'FA',
      date: new Date(),
      vat: totalVat,
      total: totalI,
      totalR:totalAmount,
      customer: customer,
      discount:discount,
      items: lineItems?.map((line) =>{
        return{ 
          description:line.description,
          quantity:line.quantity,
          price:line.price,
          amount:line.amount,
          discount:line.discount,
          product: line.product?.id,          
          vat:line.vat,          
        }
      }),
    };

    await api.post('invoices', invoice).then(async (response) => {
      invoice = response.data;  
    })

    let statement = {
      code: `${invoice.type}/${invoice.id}`,
      amount:invoice.total,
      date: new Date(),
      customer: customer,
      invoice:invoice,
      type:'credit',
      status:'pedding'
    }

    await api.post('statements', statement).then((response) => {
      navigation.navigate('StatementList', { customerId:customer?.id });
    })      
  }

  async function handleAddItem() {

    let selProduct = products.find(p => p.id == product?.id.toString()) ;

    if (selProduct && price && quantity) {

      const item = {
        id: 0,        
        description: selProduct.name,
        quantity,
        price,
        amount: price * quantity,
        product: selProduct,
      }

      setLineItems([...lineItems, item]);

      setProduct(undefined);
      setPrice(0);
      setQuantity(0);
      setAmount('');

      setModalVisible(!modalVisible);
    }else{
      alert('Preencha todos os campos')
    }
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
        style={styles.input}
        value={vat}
        onChangeText={setVat}
      />

      <Text style={styles.label}>Desconto (%)</Text>
      
        <NumericInput
                initValue={discount}
                value={discount}
                onChange={value => setDiscount(value)}
                valueType='real'
                rounded />  
      <Text style={styles.label}>Total Bruto</Text>

      <TextInput
          style={styles.input}
          value={totalR}
          editable={false}
        />

      <Text style={styles.label}>Total</Text>

      <TextInput
          style={styles.input}
          value={total}
          editable={false}
        />        

      <Text style={styles.title}>Recargas</Text>

      <RectButton style={styles.nextButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.nextButtonText}>+ Recarga</Text>
      </RectButton>
      <View style={styles.container}>
        <FlatList
          data={lineItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
              <Text style={styles.modalText}>Recarga</Text>

              <SelectBox
                label="Recarga"
                options={productList}
                value={product}
                onChange={(i) => {
                  handlerSelectProduct(i)                  
                }}
                hideInputFilter={false}
              />

              <Text style={styles.modalText}>Preço</Text>
              <NumericInput
                initValue={price}
                value={price}
                onChange={value => setPrice(value)}
                valueType='real'
                rounded />

              <Text style={styles.modalText}>Quantidade</Text>
              <NumericInput
                initValue={quantity}
                value={quantity}
                onChange={value => setQuantity(value)}
                valueType='real'
                rounded />


              <Text style={styles.modalText}>Total</Text>
              
              <TextInput
                  style={styles.input}
                  value={amount}
                  editable={false}
                />   

              <Pressable
                style={[styles.nextButton, styles.buttonClose]}
                onPress={handleAddItem}
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

      <RectButton style={styles.nextButton} onPress={handleSave}>
        <Text style={styles.nextButtonText}>Gravar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  modal: {
    margin: 15
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
    padding: 5,
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