import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import QuestionType from './QuestionType';

const options = [{ _id: 'test1', categoryName: 'cat name' }, { _id: 'test2', categoryName: 'cat name 2' }];
const handleTypeSelect = (e, { value }) => this.setState({ category: value });
const panes = [
  {
    menuItem: 'Type',
    render: () => (
      <Tab.Pane attached={false}>
        <QuestionType options={options} handleTypeSelect={handleTypeSelect} />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Tags',
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
  },
  {
    menuItem: 'Title',
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
  },
  {
    menuItem: 'Description',
    render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane>
  },
  {
    menuItem: 'Review',
    render: () => <Tab.Pane attached={false}>Tab 5 Content</Tab.Pane>
  }
];

export class QuestionTabs extends Component {
  disableTabChange = (e, { activeIndex }) => null;
  render() {
    return <Tab className='question-tabs' menu={{ secondary: true }} panes={panes} onTabChange={this.disableTabChange} />;
  }
}

const mapStateToProps = state => ({
  category: null
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionTabs);
