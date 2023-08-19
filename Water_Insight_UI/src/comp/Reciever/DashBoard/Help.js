import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function SelectBox({ name = "", value = "", onChange, optionsList = [] }) {
  return (
    <div className='mb-3'>
      <label className='mb-0.5 font-medium' htmlFor={name}>{name}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" disabled></option>
        {
          optionsList.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export function Cal() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const onChange = ([start, end]) => {
    setStartDate(start)
    setEndDate(end)

    if (start && end) {
      console.log({ start, end })
    }
  }

  return (
    <div className='mb-5'>
      <div className='mb-0.5 font-medium'>Select Date Range</div>

      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        className='w-52'
        placeholderText='Select date'
      />
    </div>
  )
}
