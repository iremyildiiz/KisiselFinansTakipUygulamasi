import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

import DebtCreditScreen from '../screens/DebtCreditScreen';
import HomeScreen from '../screens/HomeScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import MonthlyChartScreen from '../screens/ChartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: '',
                headerShown: true,
                headerStyle: { backgroundColor: '#e5e2c5ff' },
                headerRight: () => (
                  <View style={styles.headerRightContainer}>
                    <IconButton
                       icon="currency-usd"
                       size={27}
                       onPress={() => navigation.navigate('Currency')}
                       iconColor="#5E936C"
                       style={{ marginRight: 40 }}
                      />
                    <IconButton
                      icon="chart-line"
                      size={27}
                      onPress={() => navigation.navigate('MonthlyChart')}
                      iconColor="#5E936C"
                      style={{ marginRight: 50}}

                    />
                    <IconButton
                      icon="account-cash"
                      size={27}
                      onPress={() => navigation.navigate('DebtCredit')}
                      iconColor="#5E936C"
                      style={{ marginRight: 50 }}

                    />
                    <IconButton
                      icon="account"
                      size={26}
                      onPress={() => navigation.navigate('Profile')}
                      iconColor="#5E936C"
                      style={{ marginRight: 40 }}
                    />
                  </View>
                ),
              })}
            />
            <Stack.Screen name="Currency" component={CurrencyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DebtCredit" component={DebtCreditScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MonthlyChart" component={MonthlyChartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
