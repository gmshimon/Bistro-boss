import React from 'react'
import ReactApexChart from 'react-apexcharts'

const PieChart = ({ product }) => {
  const category = product?.map(item => item.category)
  const count = product?.map(item => item.count)
  const colors = [
    '#775DD0',
    '#008FFB',
    '#FEB019',
    '#FF4560',
    '#546E7A',
    '#00E396',
    '#26a69a',
    '#D10CE8'
  ]
  const series = count
  const options = {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: category,
    colors: colors,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }
  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='pie'
          width={380}
        />
      </div>
      <div id='html-dist'></div>
    </div>
  )
}

export default PieChart
