import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    family: 'Montserrat',
    marginTop: 30,
    padding: 10
  },
  sectionUser: {
    margin: 20,
    padding: 10,
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "justify",
    alignItems: 'right',
  },
  sectionNumber: {
    margin: 10,
    padding: 2,
    width: '45%',
    flexGrow: 1,
    fontSize: 13,
    fontWeight: 'bold',
    alignSelf: 'left',
    backgroundColor: '#E7DFDF'
  },
  sectionBill: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 35,
  },
  sectionMiddle: {
    bottom: 20,
  },
  table: {
    display: "table",
    marginTop: 30,
    marginRight: 15,
    marginLeft: 15,
    height: '70px',
    borderStyle: "solid",
    border: 1,
    alignItems: 'center',
  },
  tableRowTop: {
    height: '20px',
    margin: 0,
    backgroundColor: '#E7DFDF',
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
    textAlign: 'center',
  },
  tableCell: {
    width: '100%',
    height: '100%',
    margin: 0,
    fontSize: 11,
    alignItems: 'center',
  },
  sectionShipping: {
    paddingLeft: 50,
    paddingRight: 15,
    paddingTop: 5,
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: 2,
  },
  sectionTVA: {
    paddingLeft: 40,
    paddingRight: 15,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
    borderStyle: 'solid',
    borderBottom: 2,
    borderBottomColor: '#000',
    lineHeight: 2,
  },
  sectionTotalPrice: {
    paddingLeft: 50,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 3,
  },
  sectionFooter: {
    justifyContent: 'center',
    fontSize: 10,
    bottom: 40,
    margin: 'auto',
    position: 'absolute',
    textAlign: 'center',
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
          <Text>Numéro de facture : 24-01-2020-000001</Text>
          <Text>Date de facture : 24-01-2020</Text>
        </View>
      </View>
      <View style={styles.sectionMiddle}>
        <View style={styles.sectionBill}>
          <Text>Facture : 24-01-2020-000001</Text>
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
        <View style={styles.sectionShipping}>
          <Text>Total Brut :</Text>
          <Text>46.50 €</Text>
        </View>
        <View style={styles.sectionTVA}>
          <Text>TVA (TVA non applicable, article 293B du Code Général des Impôts.) :</Text>
          <Text>0 €</Text>
        </View>
        <View style={styles.sectionTotalPrice}>
          <Text>Montant total :</Text>
          <Text>46.50 €</Text>
        </View>
      </View>
      <View style={styles.sectionFooter}>
        <Text>Numéro Siret : 81000765800018</Text>
        <Text>Société Jule et Lily - 56 Rue Gambetta 92 800 PUTEAUX</Text>
        <Text>Contact : Email : juleetlily@gmail.com - Téléphone : 01 00 00 00 00</Text>
      </View>
    </Page>
  </Document>
);

export default MyBill
