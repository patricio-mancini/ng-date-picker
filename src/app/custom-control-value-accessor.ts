import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export function CustomControlValueAccessor(componentRef: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => componentRef),
    multi: true
  };
}
