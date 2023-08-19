import AppWrapper from "../Template/AppWrapper";
import { ReactComponent as ChartLine } from '../../assets/svg/common/chart-line.svg';
import { ReactComponent as Setting } from '../../assets/svg/common/setting.svg';
import { ReactComponent as Support } from '../../assets/svg/common/support.svg';
import { ReactComponent as Router } from '../../assets/svg/common/router.svg';
import { ReactComponent as Config } from '../../assets/svg/common/config.svg';
import { ReactComponent as Chart } from '../../assets/svg/common/chart.svg';
import { ReactComponent as Home } from '../../assets/svg/common/home.svg';

const list = [
  {
    title: "Dashboard",
    icon: <Home className="app-sb-ic-fill" />,
    to: 'dashboard'
  },
  {
    title: "Device Data",
    icon: <Router className="app-sb-ic-fill" />,
    to: 'device-data'
  },
  {
    title: "Satellite Data",
    icon: <Chart className="app-sb-ic-stroke" />,
    to: 'satellite-data'
  },
  {
    title: "E.coli Data",
    icon: <ChartLine className="app-sb-ic-fill" />,
    to: 'e-coli-data'
  },
  {
    title: "Device Config",
    icon: <Config className="app-sb-ic-fill rotate-90" />,
    to: 'device-config'
  },
  {
    title: "Support",
    icon: <Support className="app-sb-ic-fill" />,
    to: 'support'
  },
  {
    title: "Settings",
    icon: <Setting className="app-sb-ic-fill w-5 h-5" />,
    to: 'setting'
  },
]

function Reciever() {
  return (
    <AppWrapper role="receiver" list={list} />
  )
}

export default Reciever