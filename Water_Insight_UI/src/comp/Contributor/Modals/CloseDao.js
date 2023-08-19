import { useState } from 'react';
import { closeProject } from '../../../actions/dao';
import Modal from '../../UIComp/Modal';

function CloseDao({ id, closeModal }) {
  const [loading, setLoading] = useState(false)

  const onConfirm = () => {
    setLoading(true)
    closeProject(id, closeModal, () => setLoading(false))
  }

  return (
    <Modal
      isOpen
      title='Close project'
      closeModal={closeModal}
    >
      <div className='my-8 text-lg text-center'>
        Do you want to close the project? <br />
        Are you sure?
      </div>

      <div className='dc gap-8 px-12'>
        <button
          className='px-12 py-2 bg-gray-200 hover:bg-gray-300 transition-colors'
          onClick={closeModal}
        >
          Cancel
        </button>

        <button
          className='px-12 py-2 text-white bg-red-400 hover:bg-red-500 transition-colors'
          onClick={onConfirm}
          disabled={loading}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default CloseDao