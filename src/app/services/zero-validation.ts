import { AbstractControl } from '@angular/forms';

export function checkZero(control: AbstractControl) {
  if (!control.value.startsWith('0') ) {
    return { zeroError: true };
  }
  return null;
}