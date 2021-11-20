import { createAction, props } from '@ngrx/store';
import { RegDetails, RegForm } from '../models/reg-details';

export const registerUser = createAction(
  'register',
  props<{ regDetails: RegForm }>()
);
