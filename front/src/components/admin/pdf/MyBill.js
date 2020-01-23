import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyBill = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
            Nom Prénom
            adresse
        </Text>
      </View>
      <View style={styles.section}>
        <Text>Facture</Text>
        <Text>numéro de facture:</Text>
        <Text>Date de facture:</Text>
        <Text>A payer:</Text>
      </View>
      <View style={styles.section}>
        <Text>Facture</Text>
        <Text>numéro de facture:</Text>
        <Text>Date de facture:</Text>
      </View>
    </Page>
  </Document>
);

export default MyBill
