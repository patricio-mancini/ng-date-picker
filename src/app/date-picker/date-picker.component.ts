import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators } from '@angular/forms';
import { CustomControlValueAccessor } from '../custom-control-value-accessor';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [CustomControlValueAccessor(DatePickerComponent)]
})
export class DatePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() private minimumYear = 1900;
  @Input() private maximumYear: number;
  private timeStamp: number;
  propagateChange: (number) => any;
  monthControl = new FormControl('', [Validators.required]);
  dayControl = new FormControl('', [Validators.required]);
  yearControl = new FormControl('', [Validators.required]);
  years: number[];
  days = [...Array(31)].fill(undefined).map((val, index) => index + 1);
  months = [
    {key: 0, value: 'Jan'},
    {key: 1, value: 'Feb'},
    {key: 2, value: 'Mar'},
    {key: 3, value: 'Apr'},
    {key: 4, value: 'May'},
    {key: 5, value: 'Jun'},
    {key: 6, value: 'Jul'},
    {key: 7, value: 'Aug'},
    {key: 8, value: 'Sep'},
    {key: 9, value: 'Oct'},
    {key: 10, value: 'Nov'},
    {key: 11, value: 'Dec'}
  ];

  ngOnInit() {
    this.years = [...Array(this.maximumYear - this.minimumYear + 1)].fill(undefined).map((val, index) => this.maximumYear - index);
  }

  ngAfterViewInit() {
    this.monthControl.valueChanges.subscribe((value) => this.calculateDate());
    this.dayControl.valueChanges.subscribe((value) => this.calculateDate());
    this.yearControl.valueChanges.subscribe((value) => this.calculateDate());
  }

  private calculateDate() {
    if (!this.monthControl.value || !this.dayControl.value || !this.yearControl.value) {
      this.timeStamp = undefined;
    } else {
      const date = new Date(this.yearControl.value, this.monthControl.value, this.dayControl.value);
      this.timeStamp = date.getTime();
    }
    this.propagateChange(this.timeStamp);
  }

  writeValue(timeStamp: number) {
    this.timeStamp = timeStamp;
    let date;
    if (timeStamp !== undefined) { date = new Date(timeStamp); }
    this.yearControl.setValue(date ? date.getFullYear() : null);
    this.monthControl.setValue(date ? date.getMonth() : null);
    this.dayControl.setValue(date ? date.getDate() : null);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
