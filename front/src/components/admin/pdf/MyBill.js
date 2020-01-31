import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Axios from 'axios'
import { PDFDownloadLink } from "@react-pdf/renderer";

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
    height: '300px',
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
const MyBill = (props) => {

  const [orderBill, setOrderBill] = useState([])
  const [productBill, setProductBill] = useState([])
  const data = props.data
  const data1 = props.data1
  const data3 = props.data3 ? props.data3 : []
  // console.log('ici', data);
  // console.log('shipping', data1);
  // console.log('product', productBill);
  // console.log('order', orderBill);

  const data_date = new Date(data.order_date)

  const fetchOrderForBill = () => {
    Axios
      .get(`/order/order/${data.order_id}`)
      .then(res => setOrderBill(res.data))
  }

  const fetchProductBill = () => {
    Axios
      .get(`/order/order/${data.order_id}/items`)
      .then(res => setProductBill(res.data))
  }

  useEffect(() => {
    fetchOrderForBill()
    fetchProductBill()
  }, [])

  return (
    props.data3 ?
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.sectionUser}>
            <Text>{data1 && data1[0].address_firstname} {data1 && data1[0].address_lastname}</Text>
            <Text>{data1 && data1[0].address_street}</Text>
            <Text>{data1 && data1[0].address_zip_code} {data1 && data1[0].address_city}</Text>
          </View>
          <View style={styles.sectionNumber}>
            <Text>Numéro de facture : {data.order_ref}</Text>
            <Text>Date de facture : {data_date.toLocaleDateString()}</Text>
          </View>
        </View>
        <View style={styles.sectionMiddle}>
          <View style={styles.sectionBill}>
            <Text>Facture : {data.order_ref}</Text>
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
            {productBill && productBill.map((datas, i) => {
              return(
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{datas.product_name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{datas.product_price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.total_price}</Text>
                </View>
              </View>)
            })}
          </View>
          <View style={styles.sectionShipping}>
            <Text>Livraison :  </Text>
            <Text>{orderBill ? orderBill.shipping_price : data3 ? data3.shipping_price : '/'} €</Text>
          </View>
          <View style={styles.sectionShipping}>
            <Text>Total Brut : {data.total_price} €</Text>
            <Text>{orderBill ? data.total_price + orderBill.shipping_price : data3 ? data.total_price + data3.shipping_price : '/'}</Text>
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
    : 
    <PDFDownloadLink
    document={<MyBill
    data = {props.data}
    data1 = {props.shipping}
    data3 = {orderBill}
    data4 = {productBill}
    />}
    fileName='facture.pdf'
>
    {({ loading }) =>
        loading ? "Loading document..." : "Pdf"
    }
  </PDFDownloadLink>
  );
}

export default MyBill
