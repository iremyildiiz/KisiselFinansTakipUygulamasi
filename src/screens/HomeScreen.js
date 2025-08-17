import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, RadioButton, Card, Title, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionItem from '../components/ TransactionItem';
import { LineChart } from 'react-native-chart-kit';
import { Alert } from 'react-native';

import styles from './HomeScreen.styles'

export default function HomeScreen() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await AsyncStorage.getItem('transactions');
      if (data) setTransactions(JSON.parse(data));
    } catch (e) {
      console.error('Veri yüklenirken hata:', e);
    }
  };

  const saveTransaction = async () => {
    if (!amount || isNaN(amount)) {
     Alert.alert('','Lütfen geçerli bir tutar girin.');
      return;
    }
    const newTransaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      description,
      date: new Date().toISOString(),
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      setAmount('');
      setDescription('');
      alert('İşlem kaydedildi.');
    } catch (e) {
      console.error('Veri kaydedilirken hata:', e);
    }
  };

  const getChartData = () => {
    const days = 7;
    const labels = [];
    const incomeData = [];
    const expenseData = [];

    for (let i = days - 1; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      labels.push(day.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' }));

      const dayStr = day.toISOString().slice(0, 10);
      const incomeSum = transactions
        .filter(t => t.type === 'income' && t.date.slice(0, 10) === dayStr)
        .reduce((sum, t) => sum + t.amount, 0);
      const expenseSum = transactions
        .filter(t => t.type === 'expense' && t.date.slice(0, 10) === dayStr)
        .reduce((sum, t) => sum + t.amount, 0);

      incomeData.push(incomeSum);
      expenseData.push(expenseSum);
    }

    return {
      labels,
      datasets: [
        { data: incomeData, color: () => 'green', strokeWidth: 2, label: 'Gelir' },
        { data: expenseData, color: () => 'red', strokeWidth: 2, label: 'Gider' },
      ],
      legend: ['Gelir', 'Gider'],
    };
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={{ marginBottom: 10, textAlign: 'center' }}>Kişisel Finans Takip</Title>

      <Card style={{ padding: 13, marginBottom: 20 }}>
        <RadioButton.Group onValueChange={setType} value={type}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="expense" />
              <Text>Gider</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="income" />
              <Text>Gelir</Text>
            </View>
          </View>
        </RadioButton.Group>

        <TextInput
        label="Tutar"
        mode="outlined"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        outlineColor="#10543cff"         // dış çizgi rengi
        activeOutlineColor="#193b62ff"   // odaklandığında çizgi rengi
      />
      <TextInput
        label="Açıklama (isteğe bağlı)"
        mode="outlined"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        outlineColor="#0a4a34ff"
        activeOutlineColor="#0f355fff"
      />
      <Button 
        mode="contained" 
        onPress={saveTransaction}
        style={styles.button}
        buttonColor="#507f9eff"
        textColor="#fff"
      >
        Kaydet
      </Button>
      </Card>

      <Divider style={{ marginVertical: 10 }} />

      <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 5 }}>Son 7 Gün Gelir-Gider Grafiği</Text>
      <LineChart
        data={getChartData()}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#497553ff',
          backgroundGradientFrom: '#6ddee4ff',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 9,
          borderRadius: 16,
        }}
      />

      <Divider style={{ marginVertical: 10 }} />

      <Title style={{ marginVertical: 10 }}>İşlemler</Title>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
      />
    </ScrollView>
  );
}

