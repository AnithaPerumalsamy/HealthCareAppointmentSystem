import { Component, OnInit } from '@angular/core';
import { DropDownType } from '../app.const';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Time } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


  TimeZones: DropDownType[] = [
    { id: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi', name: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi' },
    { id: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City', name: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City' }
  ];

  AppointmentTypes: DropDownType[] = [
    { id: 'private', name: 'Private' },
    { id: 'public', name: 'Public' }
  ];

  minDate: Date;
  maxDate: Date;
  currentTime: Time;
  startMinTime: Time;
  endMinTIme: Time;
  appointmentForm: FormGroup;
  time: string;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.appointmentForm = this._formBuilder.group({

      timeZone: ['', Validators.required],
      appointmentType: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      title: ['', Validators.required],
      location: ['', Validators.required],
      comments: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    console.log('Time from date ' + this.minDate.getHours() + ':' + this.minDate.getSeconds() + '/' + this.minDate.toTimeString());
  }

  get appointmentFormCtrl() {
    return this.appointmentForm.controls;
  }

  bookAppointment() {
    console.log('In Appointment');
  }

}
