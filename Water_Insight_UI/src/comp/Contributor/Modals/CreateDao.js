import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createProject } from '../../../actions/dao';
import { errorNotify } from '../../../helper/toastifyHelp';
import Input from '../../Common/Input';
import Modal from '../../UIComp/Modal';

function CreateDao({ closeModal }) {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState({
    title: "",
    summary: "",
    description: "",
    fundingTarget: "",
    minimumStakingAmount: "",
    votingThreshold: "",
    closingTime: "",
  })

  const onChange = (key, val) => {
    setDetails(p => ({
      ...p,
      [key]: val
    }))
  }

  const onSubmit = async () => {
    if (
      !details.title ||
      !details.summary ||
      !details.description ||
      !details.fundingTarget ||
      !details.minimumStakingAmount ||
      !details.votingThreshold ||
      !details.closingTime
    ) {
      return errorNotify("All fields are required.")
    }

    setLoading(true)
    const onSuccess = () => {
      queryClient.invalidateQueries(["projects"])
      setLoading(false)
      closeModal()
    }

    createProject(details, onSuccess, () => setLoading(false))
  }

  return (
    <Modal
      isOpen
      title='Create DAO Project'
      closeModal={closeModal}
    >
      <div className='grid grid-cols-2 gap-6'>
        <Input
          name='Title'
          value={details["title"]}
          onChange={val => onChange("title", val)}
        />

        <Input
          name='Funding Target'
          value={details["fundingTarget"]}
          onChange={val => onChange("fundingTarget", val)}
        />

        <Input
          name='Minimum Staking Amount'
          value={details["minimumStakingAmount"]}
          onChange={val => onChange("minimumStakingAmount", val)}
        />

        <Input
          name='Voting Threshold'
          value={details["votingThreshold"]}
          onChange={val => onChange("votingThreshold", val)}
        />

        <Input
          name='Summary'
          value={details["summary"]}
          onChange={val => onChange("summary", val)}
        />

        <Input
          name='Closing Time'
          type='date'
          value={details["closingTime"]}
          onChange={val => onChange("closingTime", val)}
        />

        <div className='col-span-2'>
          <label className="mb-1 text-gray-700" htmlFor="Description">
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            value={details["description"]}
            onChange={e => onChange("description", e.target.value)}
            className="h-20 max-h-40"
          ></textarea>
        </div>

        <div className='dc col-span-2'>
          <button
            className='theme-btn px-12 py-2'
            onClick={onSubmit}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateDao