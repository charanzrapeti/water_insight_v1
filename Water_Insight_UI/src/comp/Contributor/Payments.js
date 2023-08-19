import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DatePicker from "react-datepicker";

import { getAllPaymentss } from '../../actions/general';

import "react-datepicker/dist/react-datepicker.css";
import Loader from '../Common/Loader';

function Payments() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const { isLoading, data } = useQuery({
    queryKey: ["payments"],
    queryFn: getAllPaymentss,
  })

  const onChange = ([start, end]) => {
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <section className='dfc h-full overflow-y-hidden'>
      <div className='df gap-4 px-4 py-4'>
        <h1 className='mr-auto text-2xl'>Payments</h1>

        <div>
          <DatePicker
            isClearable
            selectsRange
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            className='w-52'
            placeholderText='Select date range'
          />
        </div>
      </div>

      <div className='scroll-y max-w-2xl mx-auto mb-2 overflow-x-auto'>
        {
          isLoading ? <Loader wrapperCls='h-full' /> :
            <table className='w-full table-fixed'>
              <thead>
                <tr className='sticky top-0 text-[15px] font-medium bg-slate-200 text-left shadow-sm'>
                  <td className='w-36 p-2 pl-4'>Payment Id</td>
                  <td className='w-28 p-2'>Date</td>
                  <td className='w-28 p-2'>Amount</td>
                </tr>
              </thead>

              <tbody>
                {
                  data.data.map(d => (
                    <tr key={d.paymentId} className='text-sm even:bg-slate-100'>
                      <td className='p-2 pl-4'>{d.paymentId}</td>
                      <td className='p-2'>{new Date(d.DateOfPayment).toLocaleDateString()}</td>
                      <td className='p-2'>{d.paymentAmount}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        }
      </div>
    </section>
  )
}

export default Payments