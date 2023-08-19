import { IdBtn, StatusBtn } from './Btns';
import getRandom from "../../../helper/getRandom";

function Table({ data = [], value = "" }) {
  return (
    <table className='table-fixed w-full'>
      <thead>
        <tr className='sticky top-0 bg-white shadow-sm font-medium text-[#809FB8] border-b'>
          <td className='w-20 px-4 py-2 text-center'>#</td>
          <td className='w-40 px-4 py-2'>Lake name</td>
          <td className='w-40 px-4 py-2'>Value</td>
          <td className='w-32 px-4 py-2'>Date</td>
          <td className='w-28 px-4 py-2'>Status</td>
        </tr>
      </thead>

      <tbody>
        {
          data.map(d => (
            <tr key={d._id} className="text-sm border-b">
              <td className='px-4 py-2 text-center'>
                <IdBtn id={getRandom(100, 999)} type={d?.Status?.[value] || "good"} />
              </td>
              <td className='px-4 py-2'>{d.lake}</td>
              <td className='px-4 py-2'>{Number(d[value]).toFixed(3)}</td>
              <td className='px-4 py-2'>{new Date(d?.endDate).toLocaleDateString()}</td>
              <td className='px-4 py-2'><StatusBtn type={d?.Status?.[value] || "good"} /></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table