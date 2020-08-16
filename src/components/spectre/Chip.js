import cx from 'classnames'

export default function Chip (props) {
  const { className, children, style, closeButton, ...rest } = props
  return <div className={cx('chip', className)} style={style} {...rest}>
    { children }
    { closeButton ? <a href='#' class='btn btn-clear' aria-label='Close' role='button'></a> : null }
  </div>
}