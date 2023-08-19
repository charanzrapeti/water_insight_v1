import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEcoliData, refreshEcoliData } from '../../actions/general';
import getRandom from "../../helper/getRandom";

import { ReactComponent as Search } from '../../assets/svg/common/search.svg';
import { IdBtn, StatusBtn } from './Common/Btns';
import Loader from '../Common/Loader';

const deviceList = ["Hussain Sagar", "Osman Sagar", "Durgam Cheruvu"]

function EColi() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["ecoli-datas"],
    queryFn: getEcoliData
  })
  const { refetch: refresh } = useQuery({
    queryFn: refreshEcoliData,
    queryKey: ["refresh-ecoli-data"],
    enabled: false,
    onSuccess: () => {
      refetch()
    }
  })

  const [device, setDevice] = useState("")

  return (
    <div className="dfc h-full overflow-hidden">
      <div className="df gap-6 p-4 pb-2">
        <h1 className='mr-auto text-2xl font-medium'>
          Coliform Test Result <span className='text-sm text-gray-600'>(12/12/20 - 01/03/23)</span>
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
            {deviceList.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="px-4 mt-4 scroll-y h-full overflow-x-auto">
        {
          isLoading ? <Loader wrapperCls='h-full' /> :
            <table className='table-fixed w-full'>
              <thead>
                <tr className='sticky top-0 bg-white shadow-sm font-medium text-[#809FB8] border-b'>
                  <td className='w-20 px-4 py-2 text-center'>#</td>
                  <td className='w-40 px-4 py-2'>Test name</td>
                  <td className='w-28 px-4 py-2'>Type</td>
                  <td className='w-40 px-4 py-2'>Device Id</td>
                  <td className='w-36 px-4 py-2'>Started value</td>
                  <td className='w-36 px-4 py-2'>Ended value</td>
                  <td className='w-28 px-4 py-2'>Percentage</td>
                  <td className='w-32 px-4 py-2'>Date</td>
                  <td className='w-28 px-4 py-2'>Status</td>
                </tr>
              </thead>

              <tbody>
                {
                  data.data.map(d => (
                    <tr key={d._id} className="text-sm border-b">
                      <td className='px-4 py-2 text-center'>
                        <IdBtn id={getRandom(100, 999)} type={d?.status} />
                      </td>
                      <td className='px-4 py-2'>Hussain Sagar</td>
                      <td className='px-4 py-2'>Lake</td>
                      <td className='px-4 py-2'>{d?.id}</td>
                      <td className='px-4 py-2'>{Number(d?.StartedValue).toFixed(2)}</td>
                      <td className='px-4 py-2'>{Number(d?.EndedValue).toFixed(2)}</td>
                      <td className='px-4 py-2'>{d?.percentage}</td>
                      <td className='px-4 py-2'>{new Date(d?.Date).toLocaleDateString()}</td>
                      <td className='px-4 py-2'>
                        <StatusBtn type={d?.status} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        }
      </div>
    </div>
  )
}

export default EColi