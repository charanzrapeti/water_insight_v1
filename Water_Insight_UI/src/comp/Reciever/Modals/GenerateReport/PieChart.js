import { Pie } from 'react-chartjs-2';

import { options } from "../../DashBoard/constants";
import { pieChartData } from '../../DashBoard/dummyData2';

function PieChat() {
  return (
    <div className='px-8 w-min'>
      <div className="dc gap-8 mt-4">
        {
          pieChartData
            .filter((d, i) => i < 3)
            .map(d => (
              <div key={d.id} className="keen-slider__slide p-4 rounded-lg border shadow-lg">
                <button className='block w-full mb-2 p-0 pb-1 text-sm border-b text-left hover:font-semibold'>
                  {d.title}
                </button>
                <Pie data={d.data} options={options} />
              </div>
            ))
        }
      </div>

      <div className="dc gap-8 mt-8">
        {
          pieChartData
            .filter((d, i) => i > 2)
            .map(d => (
              <div key={d.id} className="keen-slider__slide p-4 rounded-lg border shadow-lg">
                <button className='block w-full mb-2 p-0 pb-1 text-sm border-b text-left hover:font-semibold'>
                  {d.title}
                </button>
                <Pie data={d.data} options={options} />
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default PieChat