import { Modal, ModalTitle, ModalBody, ModalFooter, ModalHeader } from '../spectre/Modal'

export default function CardModal (props) {
  const quote = props.quote

  return <Modal open={props.open} onClose={props.onClose}>
    <ModalHeader closeButton onClose={props.onClose}>
      <ModalTitle className='h5'>Quote</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <input defaultValue={quote.text}/>
    </ModalBody>
    <ModalFooter></ModalFooter>
  </Modal>
}