import React from "react";

/* Button Customer's */
import CustomerList from '../../screens/Customer/CustomerList';
import CustomersMap from '../../screens/Customer/CustomersMap';

import CustomerSelectMapPosition from '../../screens/Customer/CreateCustomer/SelectMapPosition';
import CustomerDetails from '../../screens/Customer/CustomerDetails';
import CustomerData from '../../screens/Customer/CreateCustomer/CustomerData';

import Invoice from '../../screens/Customer/CustomersMap';


import {
    tabBarIcon,
    tabBarIconHaveNoty,
    BottomTabNavigatorMazi,
} from "../components";

export const CustomerTabScreens = {
    SCustomerList: {
        component: CustomerList,
        options: {
            title: "Lista Clientes",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "home" }),
        },
    },
    SNewCustomer: {
        component: CustomerSelectMapPosition,
        options: {
            title: "+ Cliente",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "+ Cliente" }),
        },
    }
};

const CustomerMenu = () => (
    <BottomTabNavigatorMazi tabScreens={CustomerTabScreens} />
);

export default {
    CustomerMenu: {
        component: CustomerMenu,
        options: {
            title: "Pagina Inicial",
        },
    },
    CList: {
        component: CustomerList,
        options: {
            title: "Lista de Clientes",
        },
    },
    CMap: {
        component: CustomerSelectMapPosition,
        options: {
            title: "Posição no Mapa",
        },
    },
    CNew: {
        component: CustomerData,
        options: {
            title: "Dados Clientes",
        },
    },
    CData: {
        component: CustomerDetails,
        options: {
            title: "Detalhes",
        },
    }
};
