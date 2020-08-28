import { Component, OnInit } from '@angular/core';
import { DropDownType } from '../app.const';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Time } from '@angular/common';
import { AppointmentDetails } from '../models/AppointmentDetails';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/DataService';
import { UserDetails } from '../models/UserDetails';
import { Router } from '@angular/router';


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

  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {

    this.loggedInMember = this.authService.getLoggedInUserLocal();
    if (this.loggedInMember === '') {
      console.log('In notlogged in');
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
    });
    this.minDate = new Date();
    this.minTime.setHours(this.minDate.getHours());
    this.minTime.setMinutes(this.minDate.getMinutes());
    this.finalMinTime = this.minTime.getHours() + ':' + this.minTime.getMinutes();
    this.cloneAppointmentDetails();
  }

  get appointmentFormCtrl() {
    return this.appointmentForm.controls;
  }

  bookAppointment() {
    console.log('In Appointment');
    const appointmentDetails: AppointmentDetails = {
      timeZone: this.appointmentForm.get('timeZone').value,
      appointmentType: this.appointmentForm.get('appointmentType').value,
      startDate: this.appointmentForm.get('startDate').value,
      title: this.appointmentForm.get('title').value,
      startTime: this.appointmentForm.get('startTime').value,
      endTime: this.appointmentForm.get('endTime').value,
      location: this.appointmentForm.get('location').value,
      comments: this.appointmentForm.get('comments').value,
      id: this.authService.getLoggedInUserLocal(),
    }

    if (this.clonedMember) {
      this.dataService.updateAppointmentDetails(appointmentDetails, this.authService.getLoggedInUserLocal()).subscribe();
      this.updatedAppointmentSuccess = true;
    }
    else {
      this.dataService.createAppointment(appointmentDetails).subscribe();
      this.dataService.getUserDetails(this.authService.getLoggedInUserLocal()).subscribe(
        (data: UserDetails) => {
          this.userDetails = data;
          this.contactNo = this.userDetails.contactNo;
        }
      );
      this.appointmentCreatedSuccess = true;
    }
  }

  checkEndDate(event: any) {
    console.log('Start Date from UI ' + this.appointmentForm.get('startTime').value);
    if (event < this.appointmentForm.get('startTime').value) {
      this.inValidEndDate = true;
      console.log('In failure');
    } else {
      this.inValidEndDate = false;
    }
  }


  cloneAppointmentDetails() {
    console.log('Cloning Method');
    if (this.getParamQuertStringValueForEdit()) {
      this.clonedMemberId = this.getParamQuertStringValueForEdit();
      this.clonedMember = true;
      console.log('In clone Values');
      console.log('from login authservice' + this.clonedMemberId);
      this.dataService.getAppointmentDetails(this.clonedMemberId).subscribe(
        (data: AppointmentDetails) => {
          this.appointmentDetails = data;
          this.appointmentForm.get('timeZone').setValue(this.appointmentDetails.timeZone);
          this.appointmentForm.get('appointmentType').setValue(this.appointmentDetails.appointmentType);
          this.appointmentForm.get('startDate').setValue(this.appointmentDetails.startDate);
          this.appointmentForm.get('startTime').setValue(this.appointmentDetails.startTime);
          this.appointmentForm.get('endTime').setValue(this.appointmentDetails.endTime);
          this.appointmentForm.get('title').setValue(this.appointmentDetails.title);
          this.appointmentForm.get('location').setValue(this.appointmentDetails.location);
          this.appointmentForm.get('comments').setValue(this.appointmentDetails.comments);
        }
      );
    }
  }


  getParamQuertStringValueForEdit() {
    console.log('In edit user');
    const url = this.router.url;
    if (url.includes('edit')) {
      const httpParams = url.split('/');
      console.log(httpParams);
      if (httpParams[4]) {
        return httpParams[4];
      }
    }
  }



}
