import { createReducer, on } from '@ngrx/store';
import { RegDetails } from '../models/reg-details';
import { registerUser } from './reg.action';
import { RegState } from './reg.state';

const _createReducer = createReducer(
  RegState,
  on(registerUser, (state: RegDetails, action) => {
    return {
      ...state,
      regDetails: action.regDetails,
    };
  })
);

export function regReducer(state, action) {
  return _createReducer(state, action);
}
