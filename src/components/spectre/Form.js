
export function FormItem (props) {
  return <div className='form-group'>{ props.children }</div>
}

export function FormLabel (props) {
  return <label className='form-label' htmlFor={props.htmlFor}>{ props.children }</label>
}

export function Select (props) {
  return <select className='form-select' value={props.value} onChange={props.onChange}>
    { props.children }
  </select>
}
