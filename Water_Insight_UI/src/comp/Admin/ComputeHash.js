import { useState } from 'react';
import DatePicker from "react-datepicker";
import { computeHash } from '../../actions/admin';

function ComputeHash() {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [dataType, setDataType] = useState("")
  const [endDate, setEndDate] = useState(null)

  const onSuccess = () => {
    setIsLoading(false)
    setStartDate(new Date())
    setEndDate(null)
    setDataType("")
  }

  const onError = () => setIsLoading(false)

  const onSubmit = () => {
    const data = {
      startDate,
      endDate,
      dataType,
    }
    setIsLoading(true)
    computeHash(data, onSuccess, onError)
  }

  return (
    <section className="dc h-full bg-[#f7f7f7]">
      <div className="sm:w-96 p-6 shadow-outer rounded-2xl bg-white">
        <h1 className='mb-6 text-2xl font-medium text-center'>
          Compute Hash and <br />
          Upload to Blockchain
        </h1>

        <div className='mb-4'>
          <div className='mb-0.5 font-medium'>Start Date</div>

          <DatePicker
            isClearable
            selected={startDate}
            onChange={setStartDate}
            placeholderText='Select date'
            dateFormat="dd-MM-yyyy"
          />
        </div>

        <div className='mb-4'>
          <div className='mb-0.5 font-medium'>End Date</div>

          <DatePicker
            isClearable
            selected={endDate}
            onChange={setEndDate}
            placeholderText='Select date'
            dateFormat="dd-MM-yyyy"
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='data-type' className='mb-0.5 font-medium'>Data type</label>

          <select
            name="data-type"
            id="data-type"
            value={dataType}
            onChange={e => setDataType(e.target.value)}
          >
            <option value="" disabled>Select type</option>
            <option value="ecoli">E-coli</option>
            <option value="satellite">Setellite</option>
            <option value="devicedata">Device</option>
          </select>
        </div>

        <button
          className='theme-btn block mx-auto py-2 px-6'
          disabled={isLoading}
          onClick={onSubmit}
        >
          Compute
        </button>
      </div>
    </section>
  )
}

export default ComputeHash