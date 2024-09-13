import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

// to validate new password and confirm password to be same for change password.
  export function validateConfirmPassword(newPass:string,confPass:string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null  => {
        const newPassValue = control.get(newPass)?.value;
        const confPassValue = control.get(confPass)?.value;
        if(newPassValue != confPassValue){
            return {'failedToMatch':true};
        }
        return null;
    };
  }