import React, { Component } from 'react';
import { Segment, Statistic, List, Image } from 'semantic-ui-react';
import QuestionListTag from './QuestionListTag';
import moment from 'moment/moment.js';
import { truncateText } from '../../../app/common/util/truncateText';
import QuestionStats from '../components/QuestionStats';
class QuestionListItem extends Component {
  render() {
    const { question } = this.props;
    return (
      <Segment vertical>
        <div className='flex-box'>
          <QuestionStats question={question} />
          <div className='grow info'>
            <h3>
              <a href={`/questions/${question.uid}/${question.slug}`}>{question.title}</a>
            </h3>
            <div className='mb-3'>{truncateText(question.rawText)}</div>
            <div className='info'>
              <div className='flex-box responsive'>
                <div className='grow'>
                  <List horizontal>{question.tags && Object.values(question.tags).map((tag, idx) => <QuestionListTag key={idx} tag={tag} />)}</List>
                </div>
                <div className='user'>
                  <div>
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
