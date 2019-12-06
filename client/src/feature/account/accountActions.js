import { NEXT_STEP, PREV_STEP, SET_STEP } from './accountContants';

export const nextStep = () => {
  console.log('nextStep');
  return { type: NEXT_STEP };
};

export const prevStep = () => {
  return { type: PREV_STEP };
};

export const setStep = step => {
  return { type: SET_STEP, payload: step };
};
