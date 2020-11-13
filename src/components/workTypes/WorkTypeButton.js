
export default function WorkTypeButton (props) {

  return <div className='work-type__button' onClick={props.onClick}>
    <span>{ props.children }</span>
  </div>
}