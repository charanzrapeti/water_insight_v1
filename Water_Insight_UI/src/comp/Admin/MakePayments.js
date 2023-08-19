import { useState } from 'react';
import DatePicker from "react-datepicker";
import { payContributor } from '../../actions/admin';

function MakePayments() {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const onSuccess = () => {
    setIsLoading(false)
    setStartDate(new Date())
    setEndDate(null)
  }

  const onError = () => setIsLoading(false)

  const onSubmit = () => {
    const data = {
      startDate,
      endDate
    }
    setIsLoading(true)
    payContributor(data, onSuccess, onError)
  }

  return (
    <section className="dc h-full bg-[#f7f7f7]">
      <div className="sm:w-96 p-6 shadow-outer rounded-2xl bg-white">
        <h1 className='mb-6 text-2xl font-medium text-center'>Make Payments</h1>

        <div className='mb-4'>
          <div className='mb-0.5 font-medium'>Start Date</div>

          <DatePicker
            isClearable
            selected={startDate}
            onChange={setStartDate}
            placeholderText='Select date'
          />
        </div>

        <div className='mb-6'>
          <div className='mb-0.5 font-medium'>End Date</div>

          <DatePicker
            isClearable
            selected={endDate}
            onChange={setEndDate}
            placeholderText='Select date'
          />
        </div>

        <button
          className='theme-btn block mx-auto py-2 px-6'
          disabled={isLoading}
          onClick={onSubmit}
        >
          Make payment
        </button>
      </div>
    </section>
  )
}

export default MakePayments