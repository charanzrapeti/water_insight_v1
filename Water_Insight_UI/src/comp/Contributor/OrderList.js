import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../actions/general';
import Loader from '../Common/Loader';

function OrderList() {
  const { isLoading, data } = useQuery({
    queryKey: ["order-list"],
    queryFn: getAllOrders,
  })

  console.log(data)
  return (
    <section className='dfc h-full overflow-y-hidden'>
      <div className='df gap-4 px-4 py-4'>
        <h1 className='text-2xl'>Order List</h1>
      </div>

      <div className='scroll-y overflow-x-auto px-4 mb-2'>
        {
          isLoading ? <Loader wrapperCls='h-full' /> :
            <table className='w-full table-fixed'>
              <thead>
                <tr className='sticky top-0 text-[15px] font-medium bg-slate-200 text-left shadow-sm z-1'>
                  <td className='w-36 p-2 pl-4'>Order Id</td>
                  <td className='w-28 p-2'>Start Date</td>
                  <td className='w-28 p-2'>End Date</td>
                  <td className='w-28 p-2'>Order Date</td>
                  <td className='w-28 p-2'>Order Status</td>
                  <td className='w-28 p-2'></td>
                </tr>
              </thead>

              <tbody>
                {
                  data.data.map(d => (
                    <tr key={d._id} className='text-sm even:bg-slate-100'>
                      <td className='p-2 pl-4'>{d.id}</td>
                      <td className='p-2'>{new Date(d?.startDate).toLocaleDateString()}</td>
                      <td className='p-2'>{new Date(d?.endDate).toLocaleDateString()}</td>
                      <td className='p-2'>{new Date(d?.orderDate).toLocaleDateString()}</td>
                      <td className={`p-2 capitalize ${d.orderStatus === "Failed" ? "text-red-400" : d.orderStatus === "Success" ? "text-green-400" : "text-yellow-300"}`}>
                        {d.orderStatus}
                      </td>
                      <td>
                        {
                          d.orderStatus === "Success" &&
                          <button className='theme-btn text-xs opacity-80'>
                            Download
                          </button>
                        }
                      </td>
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

export default OrderList