import {Injectable} from '@angular/core';
import {ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {emailRegex} from '../constants';

export function NotBlank(control: AbstractControl): any {
  if ((control.value && !/([^\s])/.test(control.value))) {
    return {notBlank: true};
  }
  return null;
}

@Injectable()
export class CustomValidationService {
  private static capitalize(caption: string): string {
    return caption.charAt(0).toUpperCase() + caption.slice(1);
  }

  getValidatorErrorMessage(fieldName: string, validatorName: string, validatorValue?: any): string {
    const config = {
      invalidPassword:
        'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number',
      required: `${CustomValidationService.capitalize(fieldName)} is required`,
      passwordMismatch: 'Passwords does not match',
      invalid: `${CustomValidationService.capitalize(fieldName)} is invalid`,
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      invalidDateFormat: 'Invalid year',
      invalidInteger: 'Field should be integer',
      invalidPositiveNumber: 'Field should be positive number',
      email: 'Invalid Email',
      invalidUrl: 'Invalid Url',
      invalidPhoneNumber: 'Invalid phone number',
      notBlank: `${CustomValidationService.capitalize(fieldName)} should not be blank`,
    };

    return config[validatorName];
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : {invalidPassword: true};
    };
  }

  MatchPassword(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMismatch: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = emailRegex.test(String(control.value).toLowerCase());
      return valid ? null : {invalid: true};
    };
  }

  fromToDate(fromDateField: string, toDateField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromDate = control.get(fromDateField).value;
      const toDate = control.get(toDateField).value;
      if ((fromDate && toDate) && Number(fromDate) > Number(toDate)) {
        return {fromToDate: true};
      }
      return null;
    };
  }
}
