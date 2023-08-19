export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false
      }
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false
      }
    }
  },
  // scales: {
  //   y: {
  //     title: {
  //       display: true,
  //       text: 'probability'
  //     }
  //   },
  //   x: {
  //     title: {
  //       display: true,
  //       text: 'probability'
  //     }
  //   }
  // }
}

export const waterBodyOptions = [
  "Durgam cheruvu"
]

export const parameterOptions = [
  "All",
  "Turbidity",
  "PH",
  "Salinity",
  "DO",
  "Chlorophyll",
]

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export const monthOptions = [
  "All",
  ...months
]