
import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from "@expo/vector-icons";

import { useNavigation, useFocusEffect,useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../../services/api'
import { or } from 'react-native-reanimated';
import * as numbers from '../../../functions/numbers'

interface StatementDetailsRouteParams {
    customerId: number;
}

interface CustomerItemTitle {
    title: number;
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

interface Statement {
    id: number;
    code?: string;
    description?: string;
    amount?: number;
    type?: string;
    status?: number;
    invoice?: any;
    customer:Customer;
}

export default function StatementList() {

    const navigation = useNavigation();
    const route = useRoute();

    const [customer, setCustomer] = useState<Customer>();
    const [statements, setStatements] = useState<Statement[]>([]);

    const params = route.params as StatementDetailsRouteParams;
    
  useEffect(() => {

    api.get(`customers/${params.customerId}`).then(response => {
        setCustomer(response.data.customer); 
        setStatements(response.data.statements);      
    })
  }, [params.customerId]);    

    function handlerNavigateToCreateOrphanage() {
        navigation.navigate('CustomerList');
    }

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
            <Text style={styles.title} onPress={() => onPressClient(id)} >
                {title}
            </Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text>
              {item.code} - amount: {numbers.formatNumber(item.amount)} - {item.type} - {item.status }
          </Text>
      </View>
    );

    const onPressClient = (id: number) => {
        navigation.navigate('CustomerDetails', { id });
    }
    return (
        <View style={styles.container}>

            <FlatList
                data={statements}
                renderItem={renderItem}
                keyExtractor={(item: Statement) => item.id.toString()}
                ItemSeparatorComponent={renderSeparator}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}> {statements.length} Documento(s) Encontrados</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handlerNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#fff" ></Feather>
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutContainer: {
        width: 168,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },

    calloutText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8889a5',
        fontSize: 14
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3
    },
    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {

    },
    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
