import React, { useState, useEffect } from "react"
import axios from 'axios'
import {
  Cards,
  CardHistogramme,
  CardLastYear,
  CardOrdersMonth,
  CardOrdersTotal,
  Encarts
} from "../common/";

import { ReactComponent as IconBlue } from '../../../assets/icons/IconPromosBlue.svg'
import { ReactComponent as IconDarkPurple } from '../../../assets/icons/IconUsersDarkPurple.svg'


export default function Dashboard() {

  const _ = require('lodash')
  const currentYear = new Date().getFullYear()
  // const currentMonth = String(("0" + (new Date().getMonth() + 1)).slice(-2))
  const currentMonth = new Date().getMonth() + 1

  const [allorders, setAllorders] = useState({ allorders: [] });
  const [ordersweek, setOrdersWeek] = useState({ ordersweek: [] });

  const axiosData = () => {
    axios
      .get('/order/all')
      .then(res => setAllorders(res.data))
  }

  const axiosDataByWeek = () => {
    axios
      .get('/order/stats/week')
      .then(res => setOrdersWeek(res.data))
  }

  useEffect(() => {
    axiosData()
    axiosDataByWeek()
  }, [])

  const getDate = (date) => {
    let dateobj = new Date(`${date}`)
    let result = dateobj.toLocaleDateString()
    result = result.split("/").map(Number)
    const newdate = {}
    newdate.order_day = result[0]
    newdate.order_month = result[1]
    newdate.order_year = result[2]
    return newdate
  }

  const pushDate = (array) => {
    let other = {}
    array && array
      .map((item, key) => (
        other = getDate(item.order_date),
        other = _.merge(item, other)
      ))
    return array
  }

  const getOrdersByStatus = (array, status) => {
    const res = _.filter(array, { 'order_status': status })
    return res.length
  }

  const getOrderByYear = (array, year) => {
    const res = _.filter(array, { 'order_year': year })
    return res
  }


  const getOrderByQuarter = (array) => {
    const year = currentYear
    const a = currentMonth
    if (0 > a && a <= 4) {
      return _.filter(array, function (o) {
        return (o.order_month <= 4 && o.order_year === year)
      })
    }
    else if (4 > a && a <= 8) {
      return _.filter(array, function (o) {
        return ((o.order_month > 4 || o.order_month <= 8) && o.order_year === year)
      })
    }
    else {
      return _.filter(array, function (o) {
        return (o.order_month > 8 && o.order_year === year)
      })
    }
  }

  const getOrderByMonth = (array, month, year, subyear) => {
    if (month < 0) {
      month = month + 13
      year = year - 1
    } else {
      year = year - subyear
    }
    return _.filter(array, function (o) {
      return (o.order_month === month && o.order_year === year)
    })
  }

  const getTot = (array) => {
    let tot = 0
    array && array
      .map((item, key) => (
        tot = tot + item.total_price
      ))
    return Math.round(tot)
  }

// Une fois que la donnée est récupérée dans le tab allorders, merger day/month/year
  allorders[0] && pushDate(allorders)

  return (
    <div className="container">
      <div className="row">
        <div className="card-orders-month col-lg-5 p-4">
          <Encarts title="Commandes du mois">
            <CardOrdersMonth stats={getOrderByMonth(allorders, currentMonth, currentYear, 0).length} />
          </Encarts>
        </div>
        <div className="card-orders-total col-lg-7 p-4">
          <Encarts title="Total commandes">
            <div className="row">
              <CardOrdersTotal title="En cours" stats={getOrdersByStatus(allorders, 0)} border="border-right" />
              <CardOrdersTotal title="Expédiées" stats={getOrdersByStatus(allorders, 1)} />
            </div>
          </Encarts>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 p-4">
          <Encarts title="Statistique des ventes">
            <div className="row">
              <Cards title="Ventes de la semaine" stats={ordersweek[0] && getTot(ordersweek) + "€"} />
              <Cards title="Ventes du mois" stats={getTot(getOrderByMonth(allorders, currentMonth, currentYear, 0)) + "€"} />
              <Cards title="Ventes du trimestre" stats={getTot(getOrderByQuarter(allorders)) + "€"} />
              <Cards title="Ventes de l'année" stats={getTot(getOrderByYear(allorders, currentYear)) + "€"} />
            </div>
          </Encarts>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 p-4">
          <Encarts title="Historique des ventes">
            <CardHistogramme
              info="CA en €"
              title="Au cours des 5 derniers mois"
              color="#4e73df"
              currentMonth={currentMonth}
              month1={getTot(getOrderByMonth(allorders, currentMonth, currentYear, 0))}
              month2={getTot(getOrderByMonth(allorders, (currentMonth - 2), currentYear, 0))}
              month3={getTot(getOrderByMonth(allorders, (currentMonth - 3), currentYear, 0))}
              month4={getTot(getOrderByMonth(allorders, (currentMonth - 4), currentYear, 0))}
              month5={getTot(getOrderByMonth(allorders, (currentMonth - 5), currentYear, 0))}
            />
          </Encarts>
        </div>
        <div className="col-lg-4 p-4">
          <Encarts title="CA hebdomadaire">
            <CardLastYear title="Ce mois-ci" stats={getTot(getOrderByMonth(allorders, currentMonth, currentYear, 0))} color1="blue" border="border-bottom">
              <IconBlue />
            </CardLastYear>
            <CardLastYear title="Il y a un an" stats={getTot(getOrderByMonth(allorders, currentMonth, currentYear, 1))} color1="blue">
              <IconBlue />
            </CardLastYear>
          </Encarts>
        </div>
      </div>
      <div className="row">
        <div className="card-visitors col-lg-4 p-4">
          <Encarts title="Nombre de visites">
            <CardLastYear title="Ce mois-ci" stats={1984} color1="darkpurple" border="border-bottom">
              <IconDarkPurple />
            </CardLastYear>
            <CardLastYear title="Il y a un an" stats={3452} color1="darkpurple">
              <IconDarkPurple />
            </CardLastYear>
          </Encarts>
        </div>
        <div className="col-lg-8 p-4">
          <Encarts title="Historique des visites">
            <CardHistogramme
              info="visites"
              title="Au cours des 5 derniers mois"
              color="#390a93"
              currentMonth={currentMonth}
              month1={1984}
              month2={10308}
              month3={5587}
              month4={4987}
              month5={4287}
            />
          </Encarts>
        </div>
      </div>
    </div>
  )
}
