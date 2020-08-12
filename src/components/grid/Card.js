import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IoIosStarOutline } from 'react-icons/io'

import * as UIActions from '../../actions/ui'

class Card extends Component {

  openCard = (id) => {

  }

  renderCard () {
    const { idx, card } = this.props
    return <div className='card' onDoubleClick={() => this.openCard(idx)}>
      <div className='card-header'>
        <IoIosStarOutline />
      </div>
      <div className='card-body'>
        <p>&ldquo;{card}&rdquo;</p>
      </div>
    </div>
  }

  render () {
    if (this.props.ui.openCard) {
      return this.renderCard()
    } else {
      return this.renderCard()
    }
  }

  static propTypes = {
    card: PropTypes.string,
    idx: PropTypes.number
  }
}


function mapStateToProps (state, ownProps) {
  console.log('ownProps', ownProps)
  return {
    ui: state.ui
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(UIActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)