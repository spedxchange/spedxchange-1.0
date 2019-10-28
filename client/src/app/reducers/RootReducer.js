import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as TaostrReducer } from 'react-redux-toastr';
import AuthReducer from '../layout/auth/AuthReducer';
import NavReducer from '../../app/layout/nav/navReducer';
import SearchReducer from '../../app/layout/nav/searchBar/searchReducer';
import QuestionReducer from '../../feature/question/questionReducer';
import ModalReducer from '../layout/modal/ModalReducer';
import AsyncReducer from '../common/async/asyncReducer';
import TestReducer from '../../feature/testarea/TestReducer';
import NewsReducer from '../../feature/news/newsReducer';
import CategoryReducer from '../common/actions/category/categoryReducer';
import QuestionFormReducer from '../../feature/question/questionForm/actions/questionFormReducer';
import TagInput from '../common/form/actions/tagInputReducer';
import JobsReducer from '../../feature/jobs/actions/jobsReducer';

const rootReducer = combineReducers({
  toastr: TaostrReducer,
  async: AsyncReducer,
  auth: AuthReducer,
  modals: ModalReducer,
  form: FormReducer,
  nav: NavReducer,
  search: SearchReducer,
  test: TestReducer,
  questions: QuestionReducer,
  news: NewsReducer,
  category: CategoryReducer,
  questionForm: QuestionFormReducer,
  tagInput: TagInput,
  jobs: JobsReducer
});

export default rootReducer;
