import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import CustomerList from './pages/Customer/CustomerList';
import CustomersMap from './pages/Customer/CustomersMap';

import CustomerSelectMapPosition from './pages/Customer/CreateCustomer/SelectMapPosition';
import CustomerDetails from './pages/Customer/CustomerDetails';
import CustomerData from './pages/Customer/CreateCustomer/CustomerData';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen
                    name="CustomerList"
                    component={CustomerList}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Lista de Clientes" />
                    }}
                />
                <Screen
                    name="CustomerSelectMapPosition"
                    component={CustomerSelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />
                    }}
                />
                <Screen
                    name="CustomerData"
                    component={CustomerData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />
                <Screen
                    name="CustomersMap"
                    component={CustomersMap}
                />
                <Screen
                    name="CustomerDetails"
                    component={CustomerDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                />
                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                />
                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />
                    }}
                />
                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />
            </Navigator>

        </NavigationContainer>
    );
}