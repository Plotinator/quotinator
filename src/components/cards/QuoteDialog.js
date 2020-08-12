import React, { Component } from 'react'

class QuoteDialog extends Component {

}


function mapStateToProps (state) {
  return {
    file: state.file
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteDialog)