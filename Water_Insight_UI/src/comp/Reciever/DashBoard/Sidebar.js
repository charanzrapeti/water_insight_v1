import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Colors, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { options } from "./constants";
import dummyData from './dummyData';
import FilterBy from './FilterBy';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
  Title,
  Tooltip,
  Legend
)

function Sidebar() {
  return (
    <div className='dfc p-3 pr-0 h-[calc(100vh-3rem)]'>
      <FilterBy />

      <div className="scroll-y pr-2">
        {dummyData.map(d => (
          <div key={d.id} className="mb-2">
            <Line data={d.data} options={options} />
            <button className='block mx-auto mt-1 px-6 text-lg font-medium text-center hover:bg-blue-500 hover:text-white transition-colors'>
              {d.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar