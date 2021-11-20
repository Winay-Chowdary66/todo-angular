import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl) {
  if (!control.get('password').value && !control.get('repeatPassword').value) {
    return null;
  }
  const password: string = control.get('password').value;
  const confirmPassword: string = control.get('repeatPassword').value;

  if (password !== confirmPassword) {
    control.get('repeatPassword').setErrors({ NoPassswordMatch: true });
  }
}
