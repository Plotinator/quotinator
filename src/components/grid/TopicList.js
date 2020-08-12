import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectAllTopics, selectTopicIds } from '../../selectors/topics'
import * as UIActions from '../../actions/ui'

class TopicList extends Component {

  selectTopic = (id) => {
    this.props.actions.selectTopic(id)
  }

  renderTopic (id, topic) {
    let klassNames = 'topic'
    if (this.props.ui.selectedTopics.includes(id)) {
      klassNames += ' selected'
    }
    return <div
      key={id}
      onClick={() => this.selectTopic(id)}
      className={klassNames}
    >
      {topic.name}
    </div>
  }

  render () {
    const { topics, topicIds } = this.props
    return topicIds.map(id => {
      return this.renderTopic(id, topics[id])
    })
  }
}

function mapStateToProps (state) {
  return {
    ui: state.ui,
    topicIds: selectTopicIds(state),
    topics: selectAllTopics(state)
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
)(TopicList)