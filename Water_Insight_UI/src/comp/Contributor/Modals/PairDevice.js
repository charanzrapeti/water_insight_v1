import Modal from '../../UIComp/Modal';

function PairDevice({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      title='Pair your Device'
      closeModal={closeModal}
    >
    </Modal>
  )
}

export default PairDevice