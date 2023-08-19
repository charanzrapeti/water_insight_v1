import { useState } from 'react';
import Sidebar from "./Sidebar2";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GenerateReport from '../Modals/GenerateReport';

const lakesList = ["Hussain Sagar", "Osman Sagar", "Durgam Cheruvu"]

function DashBoard() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [lake, setLake] = useState("Hussain Sagar")
  const [open, setOpen] = useState(false)
  const [coord, setCoord] = useState({
    lat: "17.4239",
    lng: "78.4738",
  })

  const updateModal = () => setOpen(p => !p)

  const onChange = ([start, end]) => {
    setStartDate(start)
    setEndDate(end)
  }

  const updateLake = e => {
    const val = e.target.value
    setLake(val)
    if (val === "Hussain Sagar") {
      setCoord({
        lat: "17.4239",
        lng: "78.4738",
      })
    }
    if (val === "Osman Sagar") {
      setCoord({
        lat: "17.3763",
        lng: "78.2989",
      })
    }
    if (val === "Durgam Cheruvu") {
      setCoord({
        lat: "17.4300",
        lng: "78.3895",
      })
    }
  }

  return (
    <section className='dfc h-full overflow-hidden'>
      <div className="df gap-6 p-4 pb-2">
        <h1 className="text-lg font-medium mr-auto">Dashboard</h1>

        <select className="w-fit" value={lake} onChange={updateLake}>
          <option value="" disabled>Lake</option>
          {lakesList.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <div>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            // className="w-fit"
            placeholderText='Date Range'
          />
        </div>

        <div className='df p-2 bg-[#D9D9D93D] rounded-md'>
          <button className='px-2 py-1 text-sm rounded-md bg-white'>Day</button>
          <button className='px-2 py-1 text-sm rounded-md bg-white'>Month</button>
          <button className='px-2 py-1 text-sm rounded-md bg-white'>Year</button>
        </div>

        <button
          className="theme-btn text-sm"
          onClick={updateModal}
        >
          Generate report
        </button>
      </div>

      <div className="flex-1">
        <iframe
          width="100%"
          height="100%"
          style={{ border: "none" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCZ4YsHJ-UaXOd2W95mXMNhrH2SJXNzUPU&q=${coord.lat},${coord.lng}&center=${coord.lat},${coord.lng}&zoom=6`}
          title="map"
        ></iframe>
      </div>

      <Sidebar />

      {
        open &&
        <GenerateReport
          isOpen
          closeModal={updateModal}
        />
      }
    </section>
  )
}

export default DashBoard