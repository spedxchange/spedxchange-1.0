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

const rootReducer = combineReducers({
  toastr: TaostrReducer,
  async: AsyncReducer,
  auth: AuthReducer,
  modals: ModalReducer,
  form: FormReducer,
  nav: NavReducer,
  search: SearchReducer,
  test: TestReducer,
  questions: QuestionReducer
});

export default rootReducer;
