import cx from 'classnames'

export default function Button (props) {
  const { className, children, ...rest } = props
  return <button className={cx('btn', className)} {...rest}>{ children }</button>
}