import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UIActions from '../../actions/ui'
import TopicList from './TopicList'
import Card from './Card'
import { IoIosAdd } from 'react-icons/io'


const categories = ['Favorites', 'Author', 'Series', 'Book', 'Character', 'Speech', 'Event']
const cards = [
  'Someone awesome once said...',
  'Isn\'t it great that tomorrow doesn\'t have any mistakes in it yet',
  '', '', '', '', '', '',
  'Kindred spirits blah blah blah',
  '', '', '', '', '', '',
]

class GridView extends Component {

  openCard = (index) => {
    this.props.actions.openCard(index)
  }

  renderCategories () {
    return categories.map(c => <div key={c} className='category'>{c}</div>)
  }

  renderCards () {
    // TODO: just pass in card id
    return cards.map((c, idx) => <Card key={idx} card={c} idx={idx} /> )
  }

  renderAddButton () {
    return <div className='card addButton'><div className='circle'><IoIosAdd /></div></div>
  }

  render () {
    return <div className='gridWrapper'>
      <div className='topicsWrapper'>
        <div className='topicsText'>Topics</div>
        <TopicList />
      </div>
      <div className='rightSideWrapper'>
        <div className='categoriesWrapper'>{this.renderCategories()}</div>
        <div className='grid'>
          {this.renderAddButton()}
          {this.renderCards()}
        </div>
      </div>
    </div>
  }
}

function mapStateToProps (state) {
  return {
    file: state.file,
    ui: state.ui,
    quotes: state.entities.quotes,
    books: state.entities.books,
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
)(GridView)