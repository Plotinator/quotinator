import cx from 'classnames'

export function Modal (props) {
  return <div className={cx('modal modal-lg', props.className, {active: props.open})}>
    <div className='modal-overlay' aria-label='Close' onClick={props.onClose}/>
    <div className='modal-container'>
      { props.children }
    </div>
  </div>
}

export function ModalHeader (props) {
  return <div className={cx('modal-header', props.className)}>
    { props.closeButton ? <a href='#' className='btn btn-clear float-right' aria-label='Close' onClick={props.onClose}/> : null}
    { props.children }
  </div>
}

export function ModalTitle (props) { // e.g. className='h5'
  return <div className={cx('modal-title', props.className)}>
    { props.children }
  </div>
}

export function ModalBody (props) {
  return <div className={cx('modal-body', props.className)}>
    <div className='content'>
      { props.children }
    </div>
  </div>
}

export function ModalFooter (props) {
  return <div className={cx('modal-footer', props.className)}>
    { props.children }
  </div>
}