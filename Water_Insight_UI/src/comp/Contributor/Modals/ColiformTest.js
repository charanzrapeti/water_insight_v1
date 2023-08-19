import Modal from '../../UIComp/Modal';

function ColiformTest({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      title='Coliform Test'
      closeModal={closeModal}
    >
    </Modal>
  )
}

export default ColiformTest