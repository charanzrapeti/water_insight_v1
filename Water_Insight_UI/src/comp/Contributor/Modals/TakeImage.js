import Modal from '../../UIComp/Modal';

function TakeImage({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      title='Take Image'
      closeModal={closeModal}
    >
    </Modal>
  )
}

export default TakeImage