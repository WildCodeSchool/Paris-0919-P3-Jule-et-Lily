import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    family: 'Arial',
  },
  sectionUser: {
    margin: 10,
    padding: 2,
    flexGrow: 1,
    fontSize: 14,
    alignContent: 'right',
  },
  sectionNumber: {
    margin: 10,
    padding: 2,
    flexGrow: 1,
    fontSize: 13,
    alignSelf: 'left',
  },
  table: {
    display: "table",
    marginTop: 30,
    marginRight: 15,
    marginLeft: 15,
    height: '70px',
    borderStyle: "solid",
    border: 1,
  },
  tableRowTop: {
    height: '20px',
    margin: 0,
    backgroundColor: '#B3ABAB',
    flexDirection: "row",
  },
  tableRow: {
    height: '50px',
    margin: 0,
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    margin: 0,
    border: 1,
    borderStyle: "solid",
    textAlign: 'center'
  },
  tableCell: {
    // border: 1,
    // borderBottom: 0,
    // borderTop: 0,
    // borderRight: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    fontSize: 11
  },
  sectionShipping: {
    flexDirection: 'row',
    // fontSize: '11px'
  },
  sectionTotalPrice: {
    flexDirection: 'row', 
    // fontSize: '13px'
  }
});


// Create Document Component
const MyBill = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <View style={styles.sectionUser}>
          <Text>Coucou LAPRALINE</Text>
          <Text>11 rue de Poissy</Text>
          <Text>75 005 Paris</Text>

        </View>
        <View style={styles.sectionNumber}>
          <Text>Facture</Text>
          <Text>Numéro de facture: 24-01-2020-000001</Text>
          <Text>Date de facture: 24-01-2020</Text>
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRowTop}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Quantité</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Prix à l'unité</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Montant</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Bijoux fantaisie, boucles d'oreilles</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>20 €</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>40 €</Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionShipping}>
        <Text>Livraison : </Text>
        <Text>6.50 €</Text>
      </View>
      <View style={styles.sectionTotalPrice}>
        <Text>Montant total :</Text>
        <Text>46.50 €</Text>
      </View>
    </Page>
  </Document>
);

export default MyBill
