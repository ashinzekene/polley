import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import agent from '../agent';
import { POLL_LIST_LOADED, POLL_SELECTED } from '../actions/pollActions';
import  PollPreview from "./PollPreview";

const mapStateToProps = state => ({
  polls: state.pollList
})
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: POLL_LIST_LOADED, payload }),
  selectPoll: (poll) => dispatch({ type: POLL_SELECTED, poll }),
})

class PollList extends Component {
  componentDidMount() {
    this.props.onLoad(agent.Poll._getAll())
  }
  selectPoll = poll => () => this.props.selectPoll(poll)
  render() {
    if (this.props.polls && this.props.polls.length) {
      return (
        <Container text= { true }>
          {
            this.props.polls.map((poll, ind) => (
              <PollPreview onClick={ this.selectPoll(poll) } key={ind} { ...poll } />
            ))
          }
        </Container>
      )
    } else {
      return (
        <div>
          <h3>Here you will find your list of polls</h3>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollList);