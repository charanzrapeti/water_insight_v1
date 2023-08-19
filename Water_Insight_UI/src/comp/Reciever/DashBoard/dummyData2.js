import { months } from './constants';

const data = {
  Chlorophyll: [0.1, 0.2, 0.1, 0.2, 0.1, 0.2, 0.1, 0.1, 0.2, 0.1, 0.2, 0.1],
  Turbidity: [0.2, 0.6, 0.4, 0.3, 0.5, 0.8, 0.4, 0.2, 0.6, 0.4, 0.3, 0.5],
  Salinity: [0.4, 0.9, 0.1, 0.5, 0.3, 0.7, 0.2, 0.4, 0.9, 0.1, 0.5, 0.3],
  PH: [10, 60, 20, 40, 50, 60, 30, 10, 60, 20, 40, 50],
  DO: [10, 30, 60, 20, 60, 30, 40, 10, 30, 60, 20, 60],
}

const colors = {
  Chlorophyll: "#FFB536",
  Turbidity: "rgb(91, 216, 213)",
  Salinity: "#2D9B5FCC",
  PH: "rgba(27, 89, 248, 0.8)",
  DO: "#F81B6BCC",
}

function BarChartConfig(data, backgroundColor) {
  return [{
    data,
    borderRadius: 20,
    maxBarThickness: 6,
    borderWidth: 0,
    borderSkipped: false,
    barPercentage: 0.5,
    categoryPercentage: 0.5,
    backgroundColor,
  }]
}

function LineChartConfig(data, backgroundColor) {
  return [{
    data,
    borderColor: backgroundColor,
    backgroundColor,
  }]
}

function PieChartConfig(data) {
  return [{
    data,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
  }]
}

const dummyData = [
  {
    id: "1",
    title: "Turbidity",
  },
  {
    id: "2",
    title: "PH",
  },
  {
    id: "3",
    title: "Salinity",
  },
  {
    id: "4",
    title: "DO",
  },
  {
    id: "5",
    title: "Chlorophyll",
  },
]

export const barChartData = dummyData.map(d => ({
  ...d,
  data: {
    labels: months,
    datasets: BarChartConfig(data[d.title], colors[d.title]),
  }
}))

export const lineChartData = dummyData.map(d => ({
  ...d,
  data: {
    labels: months,
    datasets: LineChartConfig(data[d.title], colors[d.title]),
  }
}))

export const pieChartData = dummyData.map(d => ({
  ...d,
  data: {
    labels: months,
    datasets: PieChartConfig(data[d.title]),
  }
}))
