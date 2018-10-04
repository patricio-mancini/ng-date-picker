import { Component, Input, AfterViewInit } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators } from '@angular/forms';
import { CustomControlValueAccessor } from '../custom-control-value-accessor';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CustomControlValueAccessor(SelectComponent)]
})
export class SelectComponent implements AfterViewInit, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() default = '';
  @Input() optionsList = [];
  @Input() autocomplete = '';
  selectControl = new FormControl(undefined, [Validators.required]);
  propagateChange: (string) => any;

  ngAfterViewInit() {
    this.selectControl.valueChanges.subscribe(value => this.propagateChange(this.selectControl.value));
  }

  getOptionKey(option) {
    return option.key || option;
  }

  getOptionValue(option) {
    return option.value || option;
  }

  writeValue(value: any) {
    this.selectControl.setValue(value);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
