import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './comp/Common/PrivateRoute';
import Loader from './comp/Common/Loader';

import "keen-slider/keen-slider.min.css";

const Signup = lazy(() => import("./comp/Auth/Signup"))
const Login = lazy(() => import("./comp/Auth/Login"))

const TemplateSetting = lazy(() => import("./comp/Template/Setting"))
const TemplateSupport = lazy(() => import("./comp/Template/Support"))

const MyContribution = lazy(() => import("./comp/Contributor/MyContribution"))
const OrderEntry = lazy(() => import("./comp/Contributor/OrderEntry"))
const StartTest = lazy(() => import("./comp/Contributor/StartTest"))
const OrderList = lazy(() => import("./comp/Contributor/OrderList"))
const Payments = lazy(() => import("./comp/Contributor/Payments"))
const Contributor = lazy(() => import("./comp/Contributor"))

const AllProjects = lazy(() => import('./comp/Contributor/DAO/AllProjects'))
const MyProjects = lazy(() => import('./comp/Contributor/DAO/MyProjects'))
const DAO = lazy(() => import('./comp/Contributor/DAO'))

const SatelliteData = lazy(() => import("./comp/Reciever/SatelliteData"))
const DeviceData = lazy(() => import("./comp/Reciever/DeviceData"))
const EColiData = lazy(() => import("./comp/Reciever/EColi"))
const DashBoard = lazy(() => import("./comp/Reciever/DashBoard"))

const DeviceConfig = lazy(() => import("./comp/Admin/DeviceConfig"))
const MakePayments = lazy(() => import("./comp/Admin/MakePayments"))
const ComputeHash = lazy(() => import("./comp/Admin/ComputeHash"))
const VerifyData = lazy(() => import("./comp/Admin/VerifyData"))
const Admin = lazy(() => import("./comp/Admin"))

function App() {
  return (
    <Suspense fallback={<Loader wrapperCls='h-screen' />}>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

        <Route path='/' element={
          // <Contributor />
          <PrivateRoute comp={<Contributor />} />
        }>
          <Route path='my-contribution' element={<MyContribution />} />
          <Route path='satellite-data' element={<SatelliteData />} />
          <Route path='device-data' element={<DeviceData />} />
          <Route path='e-coli-data' element={<EColiData />} />
          <Route path='order-entry' element={<OrderEntry />} />
          <Route path='start-test' element={<StartTest />} />
          <Route path='order-list' element={<OrderList />} />
          <Route path='dashboard' element={<DashBoard />} />
          <Route path='payments' element={<Payments />} />
          <Route path='support' element={<TemplateSupport />} />
          <Route path='setting' element={<TemplateSetting />} />

          <Route path='dao' element={<DAO role="contributor" />}>
            <Route index element={<AllProjects role="contributor" />} />
            <Route path='my-projects' element={<MyProjects role="contributor" />} />
          </Route>
        </Route>

        <Route path='admin' element={<PrivateRoute comp={<Admin />} />}>
          <Route path='device-config' element={<DeviceConfig />} />
          <Route path='make-payments' element={<MakePayments />} />
          <Route path='compute-hash' element={<ComputeHash />} />
          <Route path='verify-data' element={<VerifyData />} />
          <Route path='support' element={<TemplateSupport />} />
          <Route path='setting' element={<TemplateSetting />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App