import { IdBtn, StatusBtn } from '../Common/Btns';
import { format } from 'date-fns';

function Table({ data, value = "" }) {
  return (
    <table className='table-fixed w-full'>
      <thead>
        <tr className='sticky top-0 bg-white shadow-sm font-medium text-[#809FB8] border-b'>
          <td className='w-20 px-4 py-2 text-center'>#</td>
          <td className='w-40 px-4 py-2'>Test name</td>
          <td className='w-28 px-4 py-2'>Type</td>
          <td className='w-40 px-4 py-2'>Device Id</td>
          <td className='w-48 px-4 py-2'>Value</td>
          <td className='w-32 px-4 py-2'>Date</td>
          <td className='w-28 px-4 py-2'>Status</td>
        </tr>
      </thead>

      <tbody>
        {
          data.map((d, i) => (
            <tr key={d._id} className="text-sm border-b">
              <td className='px-4 py-2 text-center'>
                <IdBtn id={100 + i} type={i % 3 === 0 ? "Warning" : i % 2 === 0 ? "Normal" : "Danger"} />
              </td>
              <td className='px-4 py-2'>Hussain Sagar</td>
              <td className='px-4 py-2'>Lake</td>
              <td className='px-4 py-2'>{d.deviceId}</td>
              <td className='px-4 py-2'>{Number(d[value]).toFixed(3)}</td>
              <td className='px-4 py-2'>{d.Date}</td>
              <td className='px-4 py-2'>
                <StatusBtn type={i % 3 === 0 ? "Warning" : i % 2 === 0 ? "Normal" : "Danger"} />
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table