import React from 'react';
import { View } from 'react-native';
import { Card, Text, Paragraph } from 'react-native-paper';

export default function TransactionItem({ transaction }) {
  const isExpense = transaction.type === 'expense';

  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: isExpense ? 'red' : 'green', fontWeight: 'bold', fontSize: 16 }}>
            {isExpense ? '-' : '+'}{transaction.amount.toFixed(2)} ₺
          </Text>
          <Text>{new Date(transaction.date).toLocaleDateString()}</Text>
        </View>
        <Paragraph>{transaction.description || '-'}</Paragraph>
      </Card.Content>
    </Card>
  );
}
