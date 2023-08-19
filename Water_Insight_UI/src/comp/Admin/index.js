import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/auth";
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as Checkbox } from '../../assets/svg/common/checkbox.svg';
import { ReactComponent as Setting } from '../../assets/svg/common/setting.svg';
import { ReactComponent as Support } from '../../assets/svg/common/support.svg';
import { ReactComponent as Payment } from '../../assets/svg/common/payment.svg';
import { ReactComponent as Config } from '../../assets/svg/common/config.svg';
import { ReactComponent as Cpu } from '../../assets/svg/common/cpu.svg';
import { ReactComponent as DAO } from '../../assets/svg/common/dao.svg';
import AppWrapper from "../Template/AppWrapper";

const list = [
  {
    title: "Device Config",
    icon: <Config className="app-sb-ic-fill rotate-90" />,
    to: '/admin/device-config'
  },
  {
    icon: <Payment className="w-5 h-5 app-sb-ic-stroke" />,
    title: "Make Payments",
    to: '/admin/make-payments'
  },
  {
    icon: <Cpu className="w-5 h-5 app-sb-ic-stroke" />,
    title: "Compute Hash",
    to: '/admin/compute-hash'
  },
  {
    icon: <Checkbox className="w-5 h-5 app-sb-ic-stroke" />,
    title: "Verify Data",
    to: '/admin/verify-data'
  },
  {
    icon: <DAO className="w-5 h-5 app-sb-ic-fill" />,
    title: "DAO",
    to: '/admin/dao'
  },
  {
    title: "Support",
    icon: <Support className="app-sb-ic-fill" />,
    to: '/admin/support'
  },
  {
    title: "Settings",
    icon: <Setting className="app-sb-ic-fill w-5 h-5" />,
    to: '/admin/setting'
  },
]

function Admin() {
  const role = useAuthStore(state => state?.userDetails?.role?.toLowerCase() || "admin")

  if (role === "admin") return <AppWrapper role="admin" list={list} />
  return <Navigate to="/" replace />
}

export default Admin