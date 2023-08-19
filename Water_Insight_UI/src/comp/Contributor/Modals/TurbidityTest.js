import Modal from '../../UIComp/Modal';

function TurbidityTest({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      title='Turbidity Test'
      closeModal={closeModal}
    >
    </Modal>
  )
}

export default TurbidityTest