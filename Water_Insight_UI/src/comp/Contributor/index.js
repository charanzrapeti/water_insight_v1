import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/auth";

import { ReactComponent as ChartLine } from '../../assets/svg/common/chart-line.svg';
import { ReactComponent as Setting } from '../../assets/svg/common/setting.svg';
import { ReactComponent as Support } from '../../assets/svg/common/support.svg';
import { ReactComponent as Payment } from '../../assets/svg/common/payment.svg';
// import { ReactComponent as Test } from '../../assets/svg/common/test.svg';
import { ReactComponent as Router } from '../../assets/svg/common/router.svg';
import { ReactComponent as Brand } from '../../assets/svg/common/brand-sentry.svg';
import { ReactComponent as Chart } from '../../assets/svg/common/chart.svg';
import { ReactComponent as List } from '../../assets/svg/common/list.svg';
import { ReactComponent as User } from '../../assets/svg/users/user.svg';
import { ReactComponent as Home } from '../../assets/svg/common/home.svg';
import { ReactComponent as DAO } from '../../assets/svg/common/dao.svg';
import AppWrapper from "../Template/AppWrapper";

const list = [
  // {
  //   icon: <Test className="app-sb-ic-stroke" />,
  //   title: "Start a Test",
  //   to: '/start-test'
  // },
  {
    title: "Dashboard",
    icon: <Home className="app-sb-ic-fill" />,
    to: '/dashboard'
  },
  {
    title: "Device Data",
    icon: <Router className="app-sb-ic-fill" />,
    to: '/device-data'
  },
  {
    title: "Satellite Data",
    icon: <Chart className="app-sb-ic-stroke" />,
    to: '/satellite-data'
  },
  {
    title: "E.coli Data",
    icon: <ChartLine className="app-sb-ic-fill" />,
    to: '/e-coli-data'
  },
  {
    icon: <User className="w-5 h-5 app-sb-ic-fill" />,
    title: "My Contribution",
    to: '/my-contribution'
  },
  {
    icon: <Payment className="w-5 h-5 app-sb-ic-stroke" />,
    title: "Payments",
    to: '/payments'
  },
  {
    icon: <Brand className="w-5 h-5 app-sb-ic-stroke" />,
    title: "Order Entry",
    to: '/order-entry'
  },
  {
    icon: <List className="w-5 h-5 app-sb-ic-stroke" />,
    title: "Order List",
    to: '/order-list'
  },
  {
    icon: <DAO className="w-5 h-5 app-sb-ic-fill" />,
    title: "DAO",
    to: '/dao'
  },
  {
    title: "Support",
    icon: <Support className="app-sb-ic-fill" />,
    to: '/support'
  },
  {
    title: "Settings",
    icon: <Setting className="app-sb-ic-fill w-5 h-5" />,
    to: '/setting'
  },
]

const onlyForContributor = ["/payments", "/device-config", "/my-contribution", "/dao"]

function Contributor() {
  const role = useAuthStore(state => state?.userDetails?.role?.toLowerCase() || "contributor")

  const final = role === "contributor" ? list : list.filter(l => !onlyForContributor.includes(l.to))

  if (role === "admin") return <Navigate to="/admin" replace />
  return <AppWrapper list={final} />
}

export default Contributor