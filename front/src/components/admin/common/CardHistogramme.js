import React from "react";
import Chart from "react-google-charts";

export default (props) => {

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const currentMonth = props.currentMonth

  const getNegativeMonth = (month) => {
    let a = 0
    if (month < 0) {
      a = month + 12
      return a
    }
    else {
      return month
    }
  }

  const monthName1 = months[getNegativeMonth(currentMonth - 1)]
  const monthName2 = months[getNegativeMonth(currentMonth - 2)]
  const monthName3 = months[getNegativeMonth(currentMonth - 3)]
  const monthName4 = months[getNegativeMonth(currentMonth - 4)]
  const monthName5 = months[getNegativeMonth(currentMonth - 5)]

  const data = [
    ["Mois", props.info, { role: "style" }],
    [monthName5, props.month5, "color: gray"],
    [monthName4, props.month4, "color: #76A7FA"],
    [monthName3, props.month3, "color: blue"],
    [monthName2, props.month2, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
    [monthName1, props.month1, "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"]
  ]

  return (
    <div>
      <Chart chartType="Bar" width="100%" height="400px" data={data} options={{
        chart: {
          title: props.title,
        },
        colors: [props.color]
      }} />
    </div>
  )
}