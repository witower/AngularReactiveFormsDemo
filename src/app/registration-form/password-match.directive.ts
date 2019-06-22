import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

/** The password has to match the passwordConfirm */
export const passwordNotMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
  
    return password && passwordConfirm && password.value === passwordConfirm.value ? null : { 'passwordNotMatch': true };
  };