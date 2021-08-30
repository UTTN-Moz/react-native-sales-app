
import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from "@expo/vector-icons";

import mapMarker from '../../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api'
import { or } from 'react-native-reanimated';

interface Customer {
    id: number;
    name?: string;
    vat?: string;
    cellphone1?: string;
    cellphone2?: string;
    latitude?: number;
    longitude?: number;
}

export default function CustomersMap() {

    const [customers, setCustomers] = useState<Customer[]>([]);

    useFocusEffect(() => {
        api.get('customers').then(response => {
            setCustomers(response.data);
        });
    })
    const navigation = useNavigation();

    function handlerNavigateToOrphanageDetails(id: number) {
        navigation.navigate('CustomerDetails', { id });
    }

    function handlerNavigateToCreateOrphanage() {
        navigation.navigate('CustomerSelectMapPosition');
    }

    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialRegion={{
                    latitude: -25.9038517,
                    longitude: 32.5903201,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }} >

                {customers.map(customer => {
                    return (
                        <Marker
                            key={customer.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: customer.latitude || 0,
                                longitude: customer.longitude || 0
                            }}
                        >

                            <Callout tooltip onPress={() => handlerNavigateToOrphanageDetails(customer.id)}>
                                <View style={styles.calloutContainer}>
                                    <Text>{customer.name}</Text>
                                </View>

                            </Callout>
                        </Marker>
                    )
                })}


            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}> {customers.length} Orfanato(s) Encontrados</Text>

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
