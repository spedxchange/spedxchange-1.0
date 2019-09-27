import React, { Component } from 'react';
import { Segment, Statistic, List, Image } from 'semantic-ui-react';
import QuestionListTag from './QuestionListTag';
import moment from 'moment/moment.js';

class QuestionListItem extends Component {
  render() {
    const { question } = this.props;
    return (
      <Segment vertical>
        <div className='flex-wrap'>
          <div className='votes'>
            <div>
              <Statistic size='mini'>
                <Statistic.Value>100</Statistic.Value>
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
          <div className='flex-item grow info'>
            <h3>
              <a href='/'>{question.title}</a>
            </h3>
            <p>{question.content}</p>
            <div className='info'>
              <div className='flex-wrap responsive'>
                <div className='flex-item grow'>
                  <List horizontal>{question.tags && Object.values(question.tags).map((tag, idx) => <QuestionListTag key={idx} tag={tag} />)}</List>
                </div>
                <div className='flex-item'>
                  <div className='user'>
                    <List horizontal>
                      <List.Item>
                        <Image avatar src={question.user.avatar} />
                        <List.Content verticalAlign='middle'>{question.user.displayName}</List.Content>
                      </List.Item>
                    </List>
                  </div>
                  {question.updated && <div className='asked'>asked {moment(question.updated).from()}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default QuestionListItem;
