import { useState } from 'react';
import { deviceConfig } from '../../actions/admin';
import SelectBox from '../Reciever/Common/SelectBox';

const list = ["Freshwater Lake", "Sewer", "Household", "Industrial water", "Other"]
function DeviceConfig() {
  const [testingAreaType, setTestingAreaType] = useState("Other")
  const [isLoading, setIsLoading] = useState("")
  const [deviceId, setDeviceId] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [email, setEmail] = useState("")

  const onSubmit = () => {
    if (deviceId && country && state && email) {
      setIsLoading(true)
      deviceConfig(
        {
          testingAreaType,
          deviceId,
          country,
          state,
          email,
        },
        () => setIsLoading(false),
        () => setIsLoading(false),
      )
    }
  }

  return (
    <div className="dfc h-full overflow-hidden">
      <div className="df gap-6 p-4 pb-2">
        <h1 className='mr-auto text-2xl font-medium'>Device Config</h1>
      </div>

      <div className="df px-6 py-2">
        <p className="font-medium">Device status</p>
        <button className="text-[#868686] bg-[#BBF3E0]">
          Active
        </button>
      </div>

      <div className='grid grid-cols-2 gap-6 px-6 max-w-3xl'>
        <div className='mb-3'>
          <label className='mb-0.5 font-medium' htmlFor="Device Id">Device Id</label>
          <input
            id='Device Id'
            type="text"
            value={deviceId}
            onChange={e => setDeviceId(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label className='mb-0.5 font-medium' htmlFor="Email">Email</label>
          <input
            id='Email'
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <SelectBox
          name='Country'
          value={country}
          onChange={setCountry}
          optionsList={["India"]}
        />
        <SelectBox
          name='State'
          value={state}
          onChange={setState}
          optionsList={["Andhra Pradesh", "Haryana", "Tamil Nadu"]}
        />
        <SelectBox
          name='Testing Area Type'
          value={testingAreaType}
          onChange={setTestingAreaType}
          optionsList={list}
        />

        <button
          className='theme-btn col-start-1'
          disabled={isLoading}
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default DeviceConfig