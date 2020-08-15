import cx from 'classnames'

export default function Spinner (props) {
  return <div className={cx('loading', {'loading-lg': props.large})}></div>
}