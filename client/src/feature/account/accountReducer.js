import { createReducer } from '../../app/common/util/ReducerUtil';
import { NEXT_STEP, PREV_STEP, SET_STEP } from './accountContants';

const initialState = {
  step: 1
};

const nextStep = state => {
  return { ...state, step: state.step + 1 };
};

const prevStep = state => {
  return { ...state, step: state.step - 1 };
};

const setStep = (state, payload) => {
  return { ...state, step: payload };
};

export default createReducer(initialState, {
  [NEXT_STEP]: nextStep,
  [PREV_STEP]: prevStep,
  [SET_STEP]: setStep
});
