import React from "react";
import Chart from "react-google-charts";

export default (props) => {

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const monthName1 = months[props.currentMonth-1]

  const data = [
    ["Mois", props.info, { role: "style" }],
    ["Septembre", props.month5, "color: gray"],
    ["Octobre", props.month4, "color: #76A7FA"],
    ["Novembre", props.month3, "color: blue"],
    ["Décembre", props.month2, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
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