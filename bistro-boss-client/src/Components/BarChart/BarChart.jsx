import React from 'react'
import ReactApexChart from 'react-apexcharts'

const BarChart = ({ sold }) => {
  const ids = sold?.map(item => item._id)
  const totalSold = sold?.map(item => item.totalSold)

  const series = [{ data: totalSold || []}]
  const colors = [
    '#008FFB',
    '#00E396',
    '#FEB019',
    '#FF4560',
    '#775DD0',
    '#546E7A',
    '#26a69a',
    '#D10CE8'
  ]
  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false // This will turn off the toolbar (breadcrumb in the top-right corner)
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ids || [],
      labels: {
        style: {
          colors: colors,
          fontSize: '15px'
        },
      },
      title: {
        text: 'Sold', // Set your title here
        style: {
          fontSize: '14px', // Adjust font size as needed
          color: '#775DD0', // Set the color for the title
          fontWeight: 'bold', // Set the font weight for the title
        }
      }
    },

    tooltip: {
        enabled: false
    }  
  }

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='bar'
          height={350}
        />
      </div>
      <div id='html-dist'></div>
    </div>
  )
}

export default BarChart
