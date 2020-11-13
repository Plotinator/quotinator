import { useEffect, useRef, useState } from 'react'
import cx from 'classnames'

export function AutoComplete (props) {
  const [menuCoords, setCoords] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (wrapperRef?.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      setCoords({x: rect.x, y: rect.y + rect.height - 2, width: rect.width})
    }
  }, [props.suggestions, showAll, props.allPossible])

  useEffect(() => {
    if (props.hideInput) setShowAll(false)
  }, [props.hideInput])

  const keyPress = e => {
    if (e.which == 13) {
      if (inputRef.current.value == '') return
      props.addNew(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  const chooseThing = (thing) => {
    inputRef.current.value = ''
    inputRef.current.focus()
    props.chooseItem(thing)
  }

  const renderMenu = () => {
    let menuThings = []
    if (showAll) {
      menuThings = props.allPossible
    } else if (props.suggestions?.length) {
      menuThings = props.suggestions
    }
    if (!menuThings.length) return null

    const menuItems = menuThings.map(thing => <AutoCompleteMenuItem key={thing.id} item={thing} onChoose={chooseThing}/>)
    const style = menuCoords ? {position: 'fixed', top: `${menuCoords.y}px`, left: `${menuCoords.x}px`, width: `${menuCoords.width}px`} : {}
    return <AutoCompleteMenu style={style}>{ menuItems }</AutoCompleteMenu>
  }

  // TODO: onFocus show the list of choices
  // That's easy, but hiding it at the right times is tough
  // to show: onFocus={() => setShowAll(true)}
  const renderInput = () => {
    if (props.hideInput) return null
    return <div className='input-group'>
      <input className='form-input' type='text'
        ref={inputRef}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.defaultInputValue || undefined}
        autoFocus={!!props.defaultInputValue}
        onKeyPress={keyPress}
        tabIndex={props.tabIndex}
      />
    </div>
  }

  const renderButton = () => {
    if (props.hideInput) return null
    if (props.suggestions?.length) return null

    return <button onClick={() => setShowAll(!showAll)} className='autocomplete-button btn btn-sm btn-action input-group-btn'>
      <i className='icon icon-arrow-down'></i>
    </button>
  }

  return <div className='autocomplete form-autocomplete' ref={wrapperRef}>
    <div className='form-autocomplete-input form-input'>
      { props.renderItems() }
      { renderInput() }
    </div>
    { renderButton() }
    { renderMenu() }
  </div>
}

export function AutoCompleteMenu (props) {
  return <ul className='autocomplete menu' style={props.style}>
    { props.children }
  </ul>
}

export function AutoCompleteMenuItem (props) {
  return <li className='menu-item' onClick={() => props.onChoose(props.item)}>
    <a href='#'>
      <div className='tile tile-centered'>
        <div className='tile-content'>
          { props.item.name }
        </div>
      </div>
    </a>
  </li>
}
