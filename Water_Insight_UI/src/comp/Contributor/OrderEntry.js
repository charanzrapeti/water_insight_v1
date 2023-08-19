import { useEffect, useState } from "react";
import { createOrder, getPurchaseAmount } from "../../actions/general";
import useAuthStore from "../../store/auth";
import Input from "../Common/Input";

function OrderEntry() {
  const email = useAuthStore(st => st.userDetails.email)
  const [isLoading, setIsLoading] = useState(false)
  const [detail, setDetail] = useState({
    orderStatus: "unpaid",
    orderDate: new Date().toLocaleDateString(),
    startDate: "",
    dataType: "",
    endDate: "",
    amount: "0",
    email,
  })

  useEffect(() => {
    if (detail.dataType && detail.startDate && detail.endDate) {
      getPurchaseAmount(
        {
          datatype: detail.dataType,
          startdate: detail.startDate,
          enddate: detail.endDate,
        },
        (res) => setDetail(p => ({
          ...p,
          amount: res * 100
        })))
    }
  }, [detail.dataType, detail.startDate, detail.endDate])

  const onChange = (key, val) => {
    setDetail(p => ({
      ...p,
      [key]: val
    }))
  }

  const onSuccess = () => {
    setIsLoading(false)
    setDetail({
      orderStatus: "unpaid",
      orderDate: new Date().toLocaleDateString(),
      startDate: "",
      dataType: "",
      endDate: "",
      email,
    })
  }

  const onError = () => setIsLoading(false)

  const onSubmit = () => {
    setIsLoading(true)
    createOrder(detail, onSuccess, onError)
  }

  return (
    <section className='grid grid-cols-2 gap-8 max-w-lg m-auto p-6 shadow-outer rounded-2xl'>
      <h1 className='mb-4 text-2xl font-medium grid-col-full text-center'>Order Entry</h1>

      <div>
        <label className="mb-1 text-gray-700" htmlFor="data-type">
          Data type
        </label>

        <select
          name=""
          id="data-type"
          value={detail.dataType}
          onChange={e => setDetail(p => ({
            ...p,
            dataType: e.target.value
          }))}
          className="text-sm focus-within:border-slate-900 disabled:bg-gray-50"
        >
          <option value="" disabled></option>
          <option value="ecoli">E-Coli</option>
          <option value="satellite">Satellite</option>
          <option value="devicedata">Device Data</option>
        </select>
      </div>

      <Input
        type="date"
        name="Start Date"
        value={detail.startDate}
        onChange={val => onChange("startDate", val)}
      />

      <Input
        type="date"
        name="End Date"
        value={detail.endDate}
        onChange={val => onChange("endDate", val)}
      />

      <Input
        name="Email"
        value={detail.email}
        disabled
      />

      <Input
        name="Order Date"
        value={detail.orderDate}
        disabled
      />

      <Input
        name="Price"
        value={detail.amount}
        disabled
      />

      <button
        className="theme-btn grid-col-full mx-auto px-12 disabled:opacity-50"
        disabled={isLoading}
        onClick={onSubmit}
      >
        Submit
      </button>
    </section>
  )
}

export default OrderEntry