import { Component, OnInit } from '@angular/core';
import { DropDownType } from '../app.const';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Time } from '@angular/common';
import { AppointmentDetails } from '../models/AppointmentDetails';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/DataService';
import { UserDetails } from '../models/UserDetails';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

declare const confirmation: any;



@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


  TimeZones: DropDownType[] = [
    { id: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi', name: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi' },
    { id: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City', name: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City' },
    { id: '(GMT -8:00) Pacific Time (US &amp; Canada)', name: '(GMT -8:00) Pacific Time (US &amp; Canada)' }
  ];

  AppointmentTypes: DropDownType[] = [
    { id: 'Private', name: 'Private' },
    { id: 'Public', name: 'Public' }
  ];

  minDate: Date;
  maxDate: Date;
  currentTime: Time;
  startMinTime: Time;
  endMinTIme: Time;
  appointmentForm: FormGroup;
  time: string;
  inValidEndDate = false;
  minTime: Date = new Date();
  finalMinTime: string;
  appointmentDetails: AppointmentDetails;
  userDetails: UserDetails;
  contactNo: string;
  loginSuccess: boolean;
  loggedInMember: string = '';
  clonedMemberId: string;
  clonedMember: boolean;
  updatedAppointmentSuccess = false;
  appointmentCreatedSuccess = false;
  alreadyAppointmentBooked = false;
  clonedAppointment = false;
  randomAppointmentId: string = '';
  formattedStartDate: string;

  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private dataService: DataService,
    private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.inValidEndDate = false;
    this.loggedInMember = this.authService.getLoggedInUserLocal();
    if (this.loggedInMember === '') {
      this.loginSuccess = false;
    } else {
      this.loginSuccess = true;
    }


    this.appointmentForm = this._formBuilder.group({
      timeZone: ['', Validators.required],
      appointmentType: ['', Validators.required],
      startDate: ['', Validators.required],
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      comments: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    }, { validator: this.endTimeValidator('startTime', 'endTime') });

    this.minDate = new Date();
    this.minTime.setHours(this.minDate.getHours());
    this.minTime.setMinutes(this.minDate.getMinutes());
    this.finalMinTime = this.minTime.getHours() + ':' + this.minTime.getMinutes();
    this.cloneAppointmentDetails();
  }


  get appointmentFormCtrl() {
    return this.appointmentForm.controls;
  }

  endTimeValidator(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      console.log('f' + f);
      console.log('t' + t);
      if (t.value < f.value) {
        console.log('In if validation');
        return {
          dates: "End time should be greater than Start time"

        };
      }
      return {};
    }

  }


  bookAppointment() {
    if (!this.clonedAppointment) {
      this.randomAppointmentId = 'APP' + Math.floor(100000 + Math.random() * 900000);
      console.log(this.randomAppointmentId);
      this.formattedStartDate = this.datePipe.transform(this.appointmentForm.get('startDate').value, "dd/MM/yyyy");
    }
    else {
      this.formattedStartDate = this.appointmentForm.get('startDate').value;
    }
    const appointmentDetails: AppointmentDetails = {
      timeZone: this.appointmentForm.get('timeZone').value,
      appointmentType: this.appointmentForm.get('appointmentType').value,
      startDate: this.formattedStartDate,
      title: this.appointmentForm.get('title').value,
      startTime: this.appointmentForm.get('startTime').value,
      endTime: this.appointmentForm.get('endTime').value,
      location: this.appointmentForm.get('location').value,
      comments: this.appointmentForm.get('comments').value,
      memberId: this.authService.getLoggedInUserLocal(),
      id: this.randomAppointmentId
    }

    if (this.clonedMember) {
      this.dataService.updateAppointmentDetails(appointmentDetails, this.randomAppointmentId).subscribe(
        res => {
          console.log('Fetching Appointment Details during edit ' + JSON.stringify(res));
        }, err => {
          console.log('Error occured while fetching appointment details');
        }
      );
      this.updatedAppointmentSuccess = true;
      this.appointmentForm.disable();
    }
    else {
      this.dataService.createAppointment(appointmentDetails).subscribe(
        res => {
          console.log('New Appointment Created ' + JSON.stringify(res));
        }, err => {
          console.log('Error occured during appointment Creation');
        }
      );
      this.dataService.getUserDetails(this.authService.getLoggedInUserLocal()).subscribe(
        res => {
          console.log('User details during appointment ' + JSON.stringify(res));
          this.userDetails = res;
          this.contactNo = this.userDetails.contactNo;
        }, err => {
          console.log('Error occured during fetching user details in Appointment booking module');
        }
      );
      confirmation();
      this.appointmentCreatedSuccess = true;
      this.appointmentForm.disable();

    }
  }

  cloneAppointmentDetails() {
    this.inValidEndDate = false;
    if (this.getParamQuertStringValueForEdit()) {
      this.randomAppointmentId = this.getParamQuertStringValueForEdit();
      this.clonedAppointment = true;
      this.clonedMember = true;
      this.dataService.getAppointmentDetails(this.randomAppointmentId).subscribe(
        res => {
          console.log('Appointment details during edit ' + JSON.stringify(res));
          this.appointmentDetails = res;
          this.appointmentForm.get('timeZone').setValue(this.appointmentDetails.timeZone);
          this.appointmentForm.get('appointmentType').setValue(this.appointmentDetails.appointmentType);
          this.appointmentForm.get('startDate').setValue(this.appointmentDetails.startDate);
          console.log('During clone  ' + this.appointmentForm.get('startDate').value);
          this.appointmentForm.get('startTime').setValue(this.appointmentDetails.startTime);
          this.appointmentForm.get('endTime').setValue(this.appointmentDetails.endTime);
          this.appointmentForm.get('title').setValue(this.appointmentDetails.title);
          this.appointmentForm.get('location').setValue(this.appointmentDetails.location);
          this.appointmentForm.get('comments').setValue(this.appointmentDetails.comments);
        }, err => {
          console.log('Edit Appointment details error');
        }
      );
    }
  }


  getParamQuertStringValueForEdit() {
    const url = this.router.url;
    if (url.includes('edit')) {
      const httpParams = url.split('/');
      console.log(httpParams);
      if (httpParams[4]) {
        return httpParams[4];
      }
    }
  }

  formatDate(startDate: string) {
    console.log('Start DATE ' + startDate);
  }

}
