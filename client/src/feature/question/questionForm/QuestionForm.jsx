/*global google*/
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import EditorInput from '../../../app/common/form/Editor';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import PlaceInput from '../../../app/common/form/PlaceInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createQuestion, updateQuestion } from '../questionActions';
import { loadQuestionCategories, loadQuestionTags } from '../../../app/common/actions/category/categoryActions';
import { openModal } from '../../../app/layout/modal/ModalActions';

import { createUid } from '../../../app/common/util/createUid';
import { createSlug } from '../../../app/common/util/createSlug';

const mapState = (state, ownProps) => {
  const questionId = ownProps.match.params.id;
  const uid = createUid();

  let question = { uid: uid };

  if (questionId && state.questions.length > 0) {
    question = state.questions.filter(question => question.id === questionId)[0];
  }

  return {
    auth: state.auth,
    initialValues: question,
    categories: state.category.questionCategories,
    loading: state.async.loading
  };
};

const actions = {
  createQuestion,
  updateQuestion,
  loadQuestionCategories,
  loadQuestionTags,
  openModal
};

const validate = combineValidators({
  title: isRequired({ message: 'Title is required' }),
  category: isRequired({ message: 'Category is required' }),
  content: composeValidators(
    isRequired({ message: 'Question content is required' }),
    hasLengthGreaterThan(10)({
      message: 'Question content must be at least 10 characters'
    })
  )()
});

const category = [{ key: 'default', text: 'Select Category', value: null }];

class QuestionForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  };

  componentDidMount() {
    this.props.openModal('AskQuestionModal');
    this.props.loadQuestionCategories();
  }

  makeCategories = () => {
    let categoryList = [];
    let cat;
    for (cat of this.props.categories) {
      categoryList.push({
        key: cat._id,
        text: cat.text,
        value: cat._id
      });
    }
    return categoryList;
  };

  onSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateQuestion(values);
      this.props.history.push(`/questions/${this.props.initialValues.uid}/${this.props.initialValues.id}`);
    } else {
      const newQuestion = {
        ...values,
        slug: createSlug(values.title),
        user: 'assets/img/user.png'
      };
      this.props.createQuestion(newQuestion);
      this.props.history.push(`/questions/${newQuestion.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue);
      });
  };

  render() {
    const { history, initialValues, invalid, submitting, pristine, loading } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Question Details' />
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
              <Field name='title' type='text' component={TextInput} placeholder='Question Name' />
              {loading ? (
                <Field name='category' component={SelectInput} options={category} placeholder='Category' />
              ) : (
                <Field name='category' component={SelectInput} options={this.makeCategories()} placeholder='Category' />
              )}
              <Field name='description' component={EditorInput} />
              <Field type='text' name='tags' component={TextInput} placeholder='Date' />
              <Button type='submit' positive disabled={invalid || submitting || pristine}>
                Submit
              </Button>
              <Button type='button' onClick={initialValues.id ? () => history.push(`/questions/${initialValues.id}`) : () => history.push('/questions')}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'questionForm', validate })(QuestionForm));
