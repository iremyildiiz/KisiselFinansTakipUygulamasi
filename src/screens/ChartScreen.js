import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { IconButton } from 'react-native-paper';

export default function MonthlyChartScreen({ navigation }) {
  // Aylara göre gelir ve gider verileri
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'];
  const incomeData = [1200, 1500, 1100, 1800, 1300, 1600];
  const expenseData = [800, 900, 1000, 950, 1200, 1100];

  // Toplamlar (PieChart için)
  const totalIncome = incomeData.reduce((a, b) => a + b, 0);
  const totalExpense = expenseData.reduce((a, b) => a + b, 0);

  const pieData = [
    {
      name: 'Gelir',
      population: totalIncome,
      color: '#4CAF50',
      legendFontColor: '#444',
      legendFontSize: 14,
    },
    {
      name: 'Gider',
      population: totalExpense,
      color: '#F44336',
      legendFontColor: '#444',
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Geri Butonu */}
      <IconButton
        icon="arrow-left"
        size={26}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        iconColor="#444"
      />

      <Text style={styles.title}>Aylık Gelir - Gider Grafiği</Text>

      {/* Çizgi Grafik */}
      <LineChart
        data={{
          labels: months,
          datasets: [
            {
              data: incomeData,
              color: () => '#4CAF50', // gelir rengi
              strokeWidth: 2,
            },
            {
              data: expenseData,
              color: () => '#F44336', // gider rengi
              strokeWidth: 2,
            },
          ],
          legend: ['Gelir', 'Gider'],
        }}
        width={Dimensions.get('window').width - 40}
        height={300}
        chartConfig={{
          backgroundGradientFrom: '#f4f4f4',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => '#444',
        }}
        bezier
        style={styles.chart}
      />

      {/* Dairesel Grafik */}
      <Text style={styles.subtitle}>Toplam Gelir - Gider Dağılımı</Text>
      <PieChart
        data={pieData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.pieChart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 1,
    right:15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  chart: {
    borderRadius: 16,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  pieChart: {
    borderRadius: 16,
  },
});
