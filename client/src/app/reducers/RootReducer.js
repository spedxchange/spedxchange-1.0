import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as TaostrReducer } from 'react-redux-toastr';
import AuthReducer from '../layout/auth/AuthReducer';
import NavReducer from '../../app/layout/nav/navReducer';
import questionReducer from '../../feature/question/questionReducer';
import ModalReducer from '../layout/modal/ModalReducer';
import asyncReducer from '../common/async/asyncReducer';
import TestReducer from '../../feature/testarea/TestReducer';

const rootReducer = combineReducers({
  nav: NavReducer,
  form: FormReducer,
  test: TestReducer,
  questions: questionReducer,
  modals: ModalReducer,
  auth: AuthReducer,
  async: asyncReducer,
  toastr: TaostrReducer
});

export default rootReducer;
