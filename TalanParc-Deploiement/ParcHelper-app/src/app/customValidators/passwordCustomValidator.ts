import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordCustomValidator {

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password: string = control.get('password')?.value; 
      const confirmPassword: string = control.get('confirmPassword')?.value; 
      if (password !== confirmPassword && confirmPassword !== "" && confirmPassword !== null && password !== "" && password !== null) {
        control.get('confirmPassword')?.setErrors({ noPasswordMatch: true });
        return { noPasswordMatch: true };
      } else if (password === confirmPassword && password !== "" && password !== null){
        if (control.get('confirmPassword').hasError('noPasswordMatch')) {
          control.get('confirmPassword').setErrors(null);
          control.updateValueAndValidity();
          return { noPasswordMatch: null };
        }
        return null;
      
      } else {
        return null;
      }
  } 
}