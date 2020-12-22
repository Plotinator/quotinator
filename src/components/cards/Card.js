import { Column } from '../spectre/Grid'
import cx from 'classnames'

export function Card (props) {
  const isNotLG = props.work || props.author
  let klasses = cx('col-sm-6 col-xs-12', {'col-lg-4': !isNotLG, work: props.work, author: props.author})
  return <Column size={isNotLG ? 2 : 3} className={klasses}>
    <div className={cx('card', {work: props.work, author: props.author})} onClick={props.onClick}>
      { props.children }
    </div>
  </Column>
}

export function CardBody (props) {
  return <div className='card-body'>
    { props.children }
  </div>
}

export function CardHeader ({ children, title, subtitle, star }) {
  return <div className='card-header'>
    { star ? star : null }
    {title ? <div class="card-title h5">{title}</div> : null}
    {subtitle ? <div class="card-subtitle text-gray">{subtitle}</div> : null}
    { children }
  </div>
}

export function CardFooter (props) {
  return <div className='card-footer'>
    { props.children }
  </div>
}