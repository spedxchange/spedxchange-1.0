import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as TaostrReducer } from 'react-redux-toastr';
import testReducer from '../../feature/testarea/TestReducer';
import questionReducer from '../../feature/question/questionReducer';
import ModalReducer from '../layout/modal/ModalReducer';
import AuthReducer from '../layout/auth/AuthReducer';
import asyncReducer from '../common/async/asyncReducer';

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  questions: questionReducer,
  modals: ModalReducer,
  auth: AuthReducer,
  async: asyncReducer,
  toastr: TaostrReducer
});

export default rootReducer;
