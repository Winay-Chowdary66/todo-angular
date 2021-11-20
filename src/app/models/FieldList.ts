export interface FieldList {
  regDetails: Field[];
}
export interface Field {
  iconClass: string;
  inputType: string;
  controlName: string;
  inputPlaceHolder: string;
  requiredErrorText?: string;
  patternErrorText?: string;
  minLenErrorText?: string;
  noPasswordMatch?: string;
  maleId?: string;
  femaleId?: string;
  groupName?: string;
  labelMale?: string;
  labelFemale?: string;
  minErrorText?: string;
}
