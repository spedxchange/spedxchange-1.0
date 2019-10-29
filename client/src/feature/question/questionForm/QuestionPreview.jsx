import React, { Component } from 'react';
import { Segment, Statistic, List, Image } from 'semantic-ui-react';
import QuestionListTag from '../list/QuestionListTag';
import moment from 'moment/moment.js';

class QuestionPreview extends Component {
  render() {
    const { question, user } = this.props;
    const now = new Date();
    return (
      <Segment vertical>
        <div className='flex-box'>
          <div className='votes'>
            <div>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>votes</Statistic.Label>
              </Statistic>
            </div>
            <div>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>answers</Statistic.Label>
              </Statistic>
            </div>
          </div>
          <div className='grow info'>
            <h3>
              <a href='/'>{question.title}</a>
            </h3>
            <div className='mb-3' dangerouslySetInnerHTML={{ __html: question.content }} />
            <div className='info'>
              <div className='flex-box responsive'>
                <div className='grow'>
                  <List horizontal>{question.tags && question.tags.split(',').map((tag, i) => <QuestionListTag key={i} tag={{ text: tag, _id: i }} />)}</List>
                </div>
                <div>
                  <List horizontal>
                    <List.Item>
                      <Image avatar src={user.avatar} />
                      <List.Content verticalAlign='middle'>{user.screenName}</List.Content>
                    </List.Item>
                  </List>
                  <div className='asked'>asked {moment(now).from()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default QuestionPreview;
