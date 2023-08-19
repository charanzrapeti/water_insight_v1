import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { getAllContributions } from '../../actions/general';
import Loader from '../Common/Loader';

function transform(data) {
  let arr = []

  data["device_data_docs"].forEach(a => {
    arr.push({
      ...a,
      type: "Device Data"
    })
  })

  data["ecoli_docs"].forEach(a => {
    arr.push({
      ...a,
      type: "Ecoli Data"
    })
  })

  return arr
}

function MyContribution() {
  const { isLoading, data } = useQuery({
    queryKey: ["contributions"],
    queryFn: getAllContributions,
  })

  const final = !isLoading ? transform(data.data) : []

  return (
    <section className='dfc h-full overflow-y-hidden'>
      <div className='df gap-4 px-4 py-4'>
        <h1 className='text-2xl'>My Contributions</h1>
      </div>

      <div className='scroll-y overflow-x-auto px-4 mb-2'>
        {
          isLoading ? <Loader wrapperCls='h-full' /> :
            <table className='w-full table-fixed'>
              <thead>
                <tr className='sticky top-0 text-[15px] font-medium bg-slate-200 text-left shadow-sm'>
                  <td className='w-36 p-2 pl-4'>Contribution Id</td>
                  <td className='w-28 p-2'>Date</td>
                  <td className='w-24 p-2'>Time</td>
                  <td className='w-32 p-2'>Type</td>
                  <td className='w-32 p-2'>Payment</td>
                </tr>
              </thead>

              <tbody>
              {
                  final.map(d => {
                    let dateTime = d?.Date?.split(',')
                    return (
                      <tr key={d._id} className='text-sm even:bg-slate-100'>
                        <td className='p-2 pl-4'>{d._id}</td>
                        {/* <td className='p-2'>{format(new Date(d.Date), "dd-MM-yy")}</td> */}
                        {/* <td className='p-2'>{format(new Date(d.Date), "HH:mm aa")}</td> */}
                        {/* <td className='p-2'>{format(new Date(d.Date), "HH:mm aa")}</td> */}
                        <td className='p-2'>{dateTime[0]}</td>
                        <td className='p-2'>{dateTime[1]}</td>
                        <td className='p-2'>{d.type}</td>
                        <td className={`p-2 ${d.paymentId ? "text-green-600" : " text-red-600"}`}>{d.paymentId ? "Paid" : "Unpaid"}</td>
                      </tr>
                    )


                  })
                }
              </tbody>
            </table>
        }
      </div>
    </section>
  )
}

export default MyContribution