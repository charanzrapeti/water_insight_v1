// {
//   id:"",
//   title:"",
//   data: {
//     labels,
//     datasets: [
//       {
//         label: '',
//         data: [100, 500, 600, 200, 900, 200, 400],
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//     ],
//   },
// }

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const dummyData = [
  {
    id: "1",
    title: "Turbidity",
    data: {
      labels,
      datasets: [{
        data: [0.2, 0.6, 0.4, 0.3, 0.5, 0.8, 0.4],
      }],
    },
  },
  {
    id: "2",
    title: "PH",
    data: {
      labels,
      datasets: [{
        data: [10, 60, 20, 40, 50, 60, 30],
      }],
    },
  },
  {
    id: "3",
    title: "Salinity",
    data: {
      labels,
      datasets: [{
        data: [0.4, 0.9, 0.1, 0.5, 0.3, 0.7, 0.2],
      }],
    },
  },
  {
    id: "4",
    title: "DO",
    data: {
      labels,
      datasets: [{
        data: [10, 30, 60, 20, 60, 30, 40],
      }],
    },
  },
  {
    id: "5",
    title: "Chlorophyll",
    data: {
      labels,
      datasets: [{
        data: [0.1, 0.2, 0.1, 0.2, 0.1, 0.2, 0.1],
      }],
    },
  },
]

export default dummyData