import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform, Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './DebtCreditScreenstyles'

export default function DebtCreditScreen() {
  const navigation = useNavigation();

  const [records, setRecords] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Borç');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(null); // "date" | "amount"
  const [filterType, setFilterType] = useState('Tümü'); // "Tümü" | "Borç" | "Alacak"
  const [filterPaid, setFilterPaid] = useState('Tümü'); // "Tümü" | "Ödenen" | "Ödenmeyen"

  useEffect(() => {
    const today = new Date();
    records.forEach(rec => {
      const due = new Date(rec.dueDate);
      if (!rec.paid && due <= today) {
        console.log(`UYARI! ${rec.name} adlı ${rec.type} vadesi geldi veya geçti!`);
      }
    });
  }, [records]);

// ...

useEffect(() => {
  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem('records');
      if (stored) {
        setRecords(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Veri yüklenemedi', e);
    }
  };
  loadData();
}, []);

useEffect(() => {
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('records', JSON.stringify(records));
    } catch (e) {
      console.error('Veri kaydedilemedi', e);
    }
  };
  saveData();
}, [records]);

  const addRecord = () => {
    if (!name.trim() || !amount.trim() || isNaN(amount)) {
      Alert.alert('Hata', 'Lütfen geçerli isim ve tutar girin.');
      return;
    }

    const newRec = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      type,
      dueDate: dueDate.toISOString().split('T')[0],
      paid: false,
    };

    setRecords([...records, newRec]);
    setName('');
    setAmount('');
  };

  const markPaid = id => {
    setRecords(records.map(rec => rec.id === id ? { ...rec, paid: true } : rec));
  };

  const deleteRecord = id => {
    setRecords(records.filter(rec => rec.id !== id));
  };

  const filteredRecords = records
    .filter(rec => rec.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter(rec => (filterType === 'Tümü' || rec.type === filterType))
    .filter(rec =>
      filterPaid === 'Tümü' ||
      (filterPaid === 'Ödenen' && rec.paid) ||
      (filterPaid === 'Ödenmeyen' && !rec.paid)
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });

  const totalDebt = records
    .filter(r => r.type === 'Borç' && !r.paid)
    .reduce((sum, r) => sum + r.amount, 0);

  const totalCredit = records
    .filter(r => r.type === 'Alacak' && !r.paid)
    .reduce((sum, r) => sum + r.amount, 0);
return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>

    <FlatList
      style={{ marginTop: 20 }}
      data={filteredRecords}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Kayıt bulunamadı.</Text>}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Borç-Alacak Takibi</Text>

          {/* Arama ve Filtreler */}
          <TextInput
            placeholder="İsimle Ara..."
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />

          <View style={styles.filterRow}>
            <TouchableOpacity onPress={() => setSortBy('date')} style={styles.filterBtn}>
              <Text>🕒 Tarihe Göre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortBy('amount')} style={styles.filterBtn}>
              <Text>💰 Tutar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
              setFilterPaid(
                filterPaid === 'Tümü' ? 'Ödenmeyen' :
                filterPaid === 'Ödenmeyen' ? 'Ödenen' : 'Tümü')
            } style={styles.filterBtn}>
              <Text>{filterPaid}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
              setFilterType(
                filterType === 'Tümü' ? 'Borç' :
                filterType === 'Borç' ? 'Alacak' : 'Tümü')
            } style={styles.filterBtn}>
              <Text>{filterType}</Text>
            </TouchableOpacity>
          </View>

          {/* Özet */}
          <View style={styles.summaryBox}>
            <Text>Toplam Borç: {totalDebt.toFixed(2)} ₺</Text>
            <Text>Toplam Alacak: {totalCredit.toFixed(2)} ₺</Text>
          </View>

          {/* Kayıt Girişi */}
          <TextInput
            placeholder="Kişi Adı"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Tutar"
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <View style={styles.typeContainer}>
            {['Borç', 'Alacak'].map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.typeButton, type === t && styles.selectedType]}
                onPress={() => setType(t)}
              >
                <Text style={[styles.typeText, type === t && { color: '#fff' }]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Text style={styles.datePickerText}>Vade Tarihi: {dueDate.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDueDate(selectedDate);
              }}
            />
          )}

          <Button title="Kaydet" onPress={addRecord}/>

         <View style={{ height: 20 }} />

        </>
      }
      renderItem={({ item }) => (
        <View style={[styles.recordCard, item.paid && { backgroundColor: '#dfe1dfff' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.recordName}>{item.name} ({item.type})</Text>
            <Text>Tutar: {item.amount.toFixed(2)} ₺</Text>
            <Text>Vade: {item.dueDate}</Text>
            <Text>Durum: {item.paid ? 'Ödendi' : 'Ödenmedi'}</Text>
          </View>
          {!item.paid && (
            <Button title="Ödendi" onPress={() => markPaid(item.id)} />
          )}
          <Button color="green" title="Sil" onPress={() => deleteRecord(item.id)} />
        </View>
      )}
    />
  </View>
);
}

