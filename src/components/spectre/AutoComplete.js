import { useEffect, useRef, useState } from 'react'
import cx from 'classnames'

export function AutoComplete (props) {
  const [menuCoords, setCoords] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef?.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setCoords({x: rect.x - 2, y: rect.y + 26, width: rect.width + 4})
    }
  }, [props.suggestions])

  const keyPress = e => {
    if (e.which == 13) {
      props.addNew(inputRef.current.value)
    }
  }

  let menu = null
  if (props.suggestions?.length) {
    const menuItems = props.renderSuggestions(props.suggestions)
    const style = menuCoords ? {position: 'fixed', top: `${menuCoords.y}px`, left: `${menuCoords.x}px`, width: `${menuCoords.width}px`} : {}
    menu = <AutoCompleteMenu style={style}>{ menuItems }</AutoCompleteMenu>
  }

  const renderInput = () => {
    if (props.hideInput) return null
    return <input className='form-input' type='text' placeholder={props.placeholder}
      ref={inputRef}
      onChange={props.onChange}
      defaultValue={props.defaultInputValue || undefined}
      autoFocus={!!props.defaultInputValue}
      onKeyPress={keyPress}
      tabIndex={props.tabIndex}
    />
  }

  return <div className='form-autocomplete'>
    <div className='form-autocomplete-input form-input'>
      { props.renderItems() }
      { renderInput() }
    </div>
    { menu ?? null }
  </div>
}

export function AutoCompleteMenu (props) {
  return <ul className='menu' style={props.style}>
    { props.children }
  </ul>
}

export function AutoCompleteMenuItem (props) {
  return <li className='menu-item' onClick={props.onChoose}>
    <a href='#'>
      <div className='tile tile-centered'>
        <div className='tile-content'>
          { props.children }
        </div>
      </div>
    </a>
  </li>
}
