import { Column } from '../spectre/Grid'

export function Card (props) {
  return <Column size={3} className='col-lg-4 col-sm-6 col-xs-12'>
    <div className='card' onClick={props.onClick}>
      { props.children }
    </div>
  </Column>
}

export function CardBody (props) {
  return <div className='card-body'>
    { props.children }
  </div>
}

export function CardFooter (props) {
  return <div className='card-footer'>
    { props.children }
  </div>
}