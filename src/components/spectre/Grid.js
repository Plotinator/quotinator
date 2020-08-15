import React from 'react'
import cx from 'classnames'

export function Grid (props) {
  return <div className={cx('container', props.className)}>{ props.children }</div>
}

export function Row (props) {
  return <div className={cx('columns col-gapless', props.className)}>{ props.children }</div>
}

export function Column (props) {
  return <div className={cx('column', `col-${props.size}`, props.className)}>
    { props.children }
  </div>
}