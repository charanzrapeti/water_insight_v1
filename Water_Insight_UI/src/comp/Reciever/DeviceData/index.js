import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getDeviceData, refreshDeviceData } from '../../../actions/general';
import useAuthStore from '../../../store/auth';

import { ReactComponent as Search } from '../../../assets/svg/common/search.svg';
import Loader from '../../Common/Loader';
import Table from './Table';
import Tabs from '../../UIComp/Tabs';

const deviceList = ["Hussain Sagar", "Osman Sagar", "Durgam Cheruvu"]

const lists = [  "K_mean_RG","CDOM","SD","TSM","Turb","cdom_ratio"]

function DeviceData() {
  const email = useAuthStore(st => st.userDetails.email)
  const [device, setDevice] = useState("")
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["device-datas"],
    queryFn: getDeviceData
  })

  const { refetch: refresh } = useQuery({
    queryFn: () => refreshDeviceData(email),
    queryKey: ["refresh-device-data"],
    enabled: false,
    onSuccess: () => {
      refetch()
    }
  })

  console.log(data)
  return (
    <div className="dfc h-full overflow-hidden">
      <div className="df gap-6 p-4 pb-2">
        <h1 className='mr-auto text-2xl font-medium'>
          DeviceData <span className='text-sm text-gray-600'>(12/12/20 - 01/03/23)</span>
        </h1>

        <button
          className="text-sm bg-[#D9D9D9]"
          onClick={refresh}
        >
          Refresh
        </button>
      </div>

      <div className="df px-4">
        <div className="df gap-3 p-2 border rounded border-[#EBEBEB]">
          <Search className="w-5 h-5 ml-0.5 fill-[#999CA0]" />
          <input
            type="text"
            placeholder='Search by'
            className='border-none p-0'
          />
        </div>

        <div>
          <select
            value={device}
            onChange={e => setDevice(e.target.value)}
          >
            <option value="" disabled>Name</option>
            {deviceList?.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {
        isLoading ? <Loader wrapperCls='h-full' /> :
          <Tabs
            tabsList={lists}
            listClass='mx-6'
            tabClass='pb-2 pt-4'
            panelClass='scroll-y overflow-x-auto ml-4 my-2'
            panelChildCls="h-full"
          >
            <Table
              data={data?.data.filter(d => d.K_mean_RG)}
              value='K_mean_RG'
            />
            <Table
              data={data?.data.filter(d => d.CDOM)}
              value='CDOM'
            />
            <Table
              data={data?.data.filter(d => d.SD)}
              value='SD'
            />
            <Table
              data={data?.data.filter(d => d.TSM)}
              value='TSM'
            />
            <Table
              data={data?.data.filter(d => d.Turb)}
              value='Turb'
            />
            <Table
              data={data?.data.filter(d => d.cdom_ratio)}
              value='cdom_ratio'
            />
          </Tabs>
      }
    </div>
  )
}

export default DeviceData