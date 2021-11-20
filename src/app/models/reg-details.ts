export interface RegDetails {
  regDetails: RegForm;
}

export class RegForm {
  fullName: '';
  userName: '';
  emailId: '';
  dateOfBirth: '';
  gender: '';
  password: '';
  repeatPassword: '';
  age: 0;
  phoneNumber: 0;
  termsAndCond: true;
}
