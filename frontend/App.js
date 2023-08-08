import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstTabScreen from './app/screens/FirstTabScreen';
import ShopList from './app/screens/ShopList';
import FAQ from './app/screens/FAQ';
import ThirdTabScreen from './app/screens/ThirdTabScreen';
import ShopMap from "./app/screens/ShopMap"
import { Ionicons } from '@expo/vector-icons';
import colors from './app/config/colors';

const Stack = createStackNavigator();

function HomeTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hom" options={{headerShown: false}} component={FirstTabScreen} />
      <Stack.Screen name="Nearest Shop List" component={ShopList} />
      <Stack.Screen name="Shop Map" component={ShopMap} />
    </Stack.Navigator>
    
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
     <NavigationContainer>
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarActiveTintColor: colors.secondary, // Change the active icon color to green
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: colors.primary },
           tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FAQ') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
          },
          
        })   
        } 
      >
        <Tab.Screen name="Home" component={ HomeTabStack }
          options={ {
            title: 'Home',
            headerShown: false,
        }} />
        <Tab.Screen name="FAQ" component={ FAQ} />
         
      </Tab.Navigator>

      
      </NavigationContainer>
  );
}
