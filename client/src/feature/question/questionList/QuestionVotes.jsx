import React, { Component } from 'react';
import { Statistic } from 'semantic-ui-react';

class QuestionVotes extends Component {
  render() {
    const { question } = this.props;
    return (
      <div className='votes'>
        <div>
          <Statistic size='mini'>
            <Statistic.Value>{question.likes}</Statistic.Value>
            <Statistic.Label>votes</Statistic.Label>
          </Statistic>
        </div>
        <div>
          <Statistic size='mini'>
            <Statistic.Value>100</Statistic.Value>
            <Statistic.Label>answers</Statistic.Label>
          </Statistic>
        </div>
      </div>
    );
  }
}

export default QuestionVotes;
