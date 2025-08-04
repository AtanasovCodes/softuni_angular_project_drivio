import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { allowedEmailProviders } from './custom-validators.constants';

export class CustomValidators {
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = new RegExp(`^[a-zA-Z0-9._%+-]+@(${allowedEmailProviders.join('|')})$`);
    const valid = emailPattern.test(control.value);
    return valid ? null : { pattern: true };
  }

  static fieldsMatch(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value1 = control.get(field1)?.value;
      const value2 = control.get(field2)?.value;

      if (value1 && value2 && value1 !== value2) {
        return { fieldsMismatch: true };
      }
      return null;
    };
  }
}
