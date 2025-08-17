import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CurrencyScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.frankfurter.app/latest?from=TRY');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data && data.rates) {
        const selectedCurrencies = ['USD', 'EUR', 'GBP'];
        const formattedRates = selectedCurrencies
          .filter(currency => data.rates[currency])
          .map(currency => ({
            currency,
            rate: (1 / data.rates[currency]).toFixed(4)
          }));
        if (formattedRates.length > 0) setRates(formattedRates);
        else throw new Error("Geçerli veri bulunamadı");
      } else throw new Error("Geçersiz veri formatı");
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Veri alınamadı: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    setNewsLoading(true);
    setNewsError(null);
    try {
      const response = await fetch('https://newsdata.io/api/1/latest?apikey=pub_35a88194a37c496b8e4ee5990ca442e7&q=finans');
      const data = await response.json();
      if (data && data.results) setNews(data.results.slice(0, 5));
      else setNewsError('Haber bulunamadı.');
    } catch (error) {
      console.error('News fetch error:', error);
      setNewsError('Haberler alınamadı.');
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    fetchNews();
  }, []);

  const convertAmount = (rate) => {
    if (!amount) return '-';
    const value = parseFloat(amount);
    if (isNaN(value)) return '-';
    return (value * parseFloat(rate)).toFixed(2);
  };

  const getCurrencyIcon = (currency) => {
    switch(currency) {
      case 'USD': return 'dollar';
      case 'EUR': return 'eur';
      case 'GBP': return 'gbp';
      default: return 'money';
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Veriler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Döviz Kurları (1 TRY Karşılığı)</Text>

      <TextInput
        style={styles.input}
        placeholder="TRY miktarını girin"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      
      {error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Button title="Tekrar Dene" onPress={fetchRates} />
        </View>
      ) : (
        <FlatList
          data={rates}
          keyExtractor={(item) => item.currency}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={getCurrencyIcon(item.currency)} size={20} color="#333" style={{marginRight: 8}} />
                <Text style={styles.currency}>{item.currency}</Text>
              </View>
              <View>
                {amount ? (
                  <Text style={styles.converted}>
                    {amount} TRY = {convertAmount(item.rate)} {item.currency}
                  </Text>
                ) : null}
                <Text style={styles.rate}>{item.rate}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false}
          ListEmptyComponent={<Text style={styles.empty}>Veri bulunamadı</Text>}
        />
      )}

      <Text style={styles.newsTitle}>Güncel Haberler / Piyasa Notları</Text>
      {newsLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : newsError ? (
        <Text style={styles.error}>{newsError}</Text>
      ) : (
        news.map((item, index) => (
          <View key={index} style={styles.newsCard}>
            <Text style={styles.newsHeadline}>{item.title}</Text>
            {item.description ? (
              <Text style={styles.newsDescription}>{item.description}</Text>
            ) : null}
            <Text style={styles.newsSource}>{item.source}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  },
  currency: { fontSize: 16, fontWeight: '600' },
  converted: { fontSize: 14, color: '#555', marginTop: 5 },
  rate: { fontSize: 16 },
  error: { color: 'red', marginBottom: 10 },
  empty: { textAlign: 'center', marginTop: 20 },
  input: { 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16
  },
  newsTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  newsCard: { backgroundColor: '#a7c1d1ff', padding: 10, borderRadius: 5, marginBottom: 8 },
  newsHeadline: { fontSize: 14, fontWeight: '600' },
  newsDescription: { fontSize: 12, color: '#423e3eff', marginTop: 5 },
  newsSource: { fontSize: 12, color: '#555', marginTop: 3 }
});
