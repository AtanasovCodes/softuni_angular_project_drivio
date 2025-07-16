import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    // TODO: Extract allowed email providers to a constant or configuration
    const allowedEmailProviders: string[] = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
    ];
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
