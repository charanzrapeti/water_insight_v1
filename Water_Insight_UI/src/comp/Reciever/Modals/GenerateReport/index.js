import { useState } from 'react';
import { Chart, LineElement, PointElement, ArcElement } from 'chart.js';
import { toPng } from 'html-to-image';

import Modal from '../../../UIComp/Modal';
import LineChat from './LineChart';
import PieChat from './PieChart';
import BarChat from './BarChat';
import NoChart from './NoChart';

Chart.register(
  LineElement,
  PointElement,
  ArcElement,
)

function GenerateReport({ isOpen, closeModal }) {
  const [chartType, setChartType] = useState("")
  const [isloading, setLoading] = useState(false)

  const takeScreenShot = () => {
    setLoading(true)
    toPng(document.getElementById("chart-to-pic"), {
      backgroundColor: "#fff",
      height: chartType === "Pie" ? 820 : 550,
      width: 1200,
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${chartType}-data.png`
        link.href = dataUrl
        link.click()
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Generate Report'
      closeModal={closeModal}
      contentCls="dfc w-fit h-[88vh] overflow-hidden"
    >
      <div className='df'>
        <label
          htmlFor="choose"
          className='shrink-0'
        >
          Choose chart type :
        </label>

        <select
          id="choose"
          name="chart"
          value={chartType}
          onChange={e => setChartType(e.target.value)}
          className="max-w-xs mr-auto"
        >
          <option value="" disabled>Select chart type</option>
          <option value="Bar">Bar</option>
          <option value="Line">Line</option>
          <option value="Pie">Pie</option>
        </select>

        {
          chartType &&
          <button
            className='theme-btn disabled:opacity-60'
            onClick={takeScreenShot}
            disabled={isloading}
          >
            Downloand as Image
          </button>
        }
      </div>

      <div id='chart-to-pic' className='scroll-y overflow-x-auto pt-4 pr-6 pb-4 -mr-6 -mb-4'>
        {!chartType && <NoChart />}
        {chartType === "Bar" && <BarChat />}
        {chartType === "Line" && <LineChat />}
        {chartType === "Pie" && <PieChat />}
      </div>
    </Modal>
  )
}

export default GenerateReport