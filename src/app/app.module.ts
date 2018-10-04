import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SelectComponent } from './select/select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CardComponent,
    SelectComponent,
    DatePickerComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
