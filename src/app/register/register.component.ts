import { Component, OnInit } from '@angular/core';
import { DropDownType } from '../app.const';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDetails } from '../models/UserDetails';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { LoginDetails } from '../models/LoginDetails';
import { Router } from '@angular/router';
import { DataService } from '../service/DataService';
import { AppointmentDetails } from '../models/AppointmentDetails';
import { DatePipe } from '@angular/common';
export function cloneValues() {

}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  GaurdianTypes: DropDownType[] = [
    { id: 'Father', name: 'Father' },
    { id: 'Husband', name: 'Husband' },
    { id: 'Mother', name: 'Mother' },
    { id: 'Others', name: 'Other' }
  ];

  GenderTypes: DropDownType[] = [
    { id: 'F', name: 'Female' },
    { id: 'M', name: 'Male' }
  ];

  MaritalStatusTypes: DropDownType[] = [
    { id: 'single', name: 'Single' },
    { id: 'married', name: 'Married' }
  ];

  TimeZones: DropDownType[] = [
    { id: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi', name: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi' },
    { id: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City', name: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City' },
    { id: '(GMT -8:00) Pacific Time (US &amp; Canada)', name: '(GMT -8:00) Pacific Time (US &amp; Canada)' }
  ];

  BloodTypes: DropDownType[] = [
    { id: 'O+ve', name: 'O+ve' },
    { id: 'O-ve', name: 'O-ve' },
    { id: 'A-ve', name: 'A-ve' },
    { id: 'A1-ve', name: 'A1-ve' },
    { id: 'B+ve', name: 'B+ve' },
    { id: 'B-ve', name: 'B-ve' }
  ];

  countryList: Array<any> = [
    { name: 'Germany', states: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
    { name: 'Spain', states: ['Barcelona'] },
    { name: 'USA', states: ['Downers Grove'] },
    { name: 'Mexico', states: ['Puebla'] },
    { name: 'China', states: ['Beijing'] },
    { name: 'India', states: ['Andra Pradesh', 'TamilNadu', 'Arunachal Pradesh', 'Kerela'] },
  ];
  states: Array<any>;
  states1: Array<any>;
  registerForm: FormGroup;
  age: number;
  citizenStatus: string;
  randomMemberId: string = '';
  computedDate: string;
  minDate: Date;
  maxDate: Date;
  userDetailsModel: UserDetails;
  loginDetails: LoginDetails;
  clonedMember: boolean;
  registrationSuccess: boolean;
  registrationCloneSuccess: boolean;
  clonedMemberId: string;
  disableCitizenField = false;
  userDeletedSuccess = false;
  appointmentDetails: AppointmentDetails;
  dateOfBirthFormatted: string;
  selectedState: string;
  onEdit: boolean;

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router, private dataService: DataService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());

    this.registerForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      userName: ['', Validators.required],
      inputPassword: ['', Validators.required],
      gaurdianType: ['', Validators.required],
      gaurdianName: ['', Validators.required],
      inputAddress1: ['', Validators.required],
      inputAddress2: ['', Validators.required],
      citizenShip: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      emailAddress: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
        ],
      ],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      contactNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      date: ['', Validators.required],
      registrationDate: [''],
      timeZone: ['', Validators.required],
      bloodType: ['', Validators.required],
      countryVisited: [''],
      citizenStatus: ['', Validators.required],
      displayName: [''],
      supplierName: ['', Validators.required],
      ssnNumber: ['']
    });
    this.getDate();
    this.cloneValues();
  }

  get registerFormCtrl() {
    return this.registerForm.controls;
  }

  getDate() {
    var today = new Date();
    this.registerForm.get('registrationDate').setValue(today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2));
  }

  public ageFromDateOfBirthday(event: any) {
    const today = new Date();
    const birthDate = new Date(event);
    this.age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      this.age--;
    }
    console.log(this.age);
    if (this.age <= 18) {
      this.citizenStatus = 'Minor Citizen';
    } else if (this.age > 18 && this.age <= 45) {
      this.citizenStatus = "Mid Citizen";
    } else if (this.age > 45 && this.age < 60) {
      this.citizenStatus = "Major Citizen";
    } else {
      this.citizenStatus = "Senior Citizen";
    }
    this.registerForm.get('citizenStatus').setValue(this.citizenStatus);
    this.disableCitizenField = true;
  }


  registerUser() {
    console.log('In register user ' + this.registerForm.get('date').value);
    this.registrationSuccess = false;
    if (!this.clonedMember) {
      this.randomMemberId = 'MEM' + Math.floor(100000 + Math.random() * 900000);
      console.log(this.randomMemberId);
      this.dateOfBirthFormatted = this.datePipe.transform(this.registerForm.get('date').value, "dd/MM/yyyy");
      console.log('In not cloned ' + this.dateOfBirthFormatted);
    } else {
      this.dateOfBirthFormatted = this.registerForm.get('date').value;
      console.log('In cloned ' + this.dateOfBirthFormatted);
    }
    const userDetails: UserDetails = {
      id: this.randomMemberId,
      name: this.registerForm.get('name').value,
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('inputPassword').value,
      gaurdianType: this.registerForm.get('gaurdianType').value,
      gaurdianName: this.registerForm.get('gaurdianName').value,
      address: this.registerForm.get('inputAddress1').value,
      address2: this.registerForm.get('inputAddress2').value,
      citizenShip: this.registerForm.get('citizenShip').value,
      state: this.registerForm.get('state').value,
      country: this.registerForm.get('country').value,
      emailAddress: this.registerForm.get('emailAddress').value,
      gender: this.registerForm.get('gender').value,
      maritalStatus: this.registerForm.get('maritalStatus').value,
      contactNo: this.registerForm.get('contactNo').value,
      dateOfBirth: this.dateOfBirthFormatted,
      registrationDate: this.registerForm.get('registrationDate').value,
      timeZone: this.registerForm.get('timeZone').value,
      bloodType: this.registerForm.get('bloodType').value,
      countryVisited: this.registerForm.get('countryVisited').value,
      citizenStatus: this.registerForm.get('citizenStatus').value,
      displayName: this.registerForm.get('displayName').value,
      supplierName: this.registerForm.get('supplierName').value,
      ssnNumber: this.registerForm.get('ssnNumber').value,
    }


    if (this.randomMemberId === '') {
      this.registrationCloneSuccess = true;
      this.dataService.updateUser(userDetails, this.authService.getLoggedInUserLocal()).subscribe(
        res => {
          console.log('Updated User Details ' + JSON.stringify(res));
        },
        err => {
          console.log('Update User details failed');
        }
      );
      this.registerForm.disable();
    } else {
      this.registrationSuccess = true;
      this.dataService.createUser(userDetails).subscribe(
        res => {
          console.log('Create New User ' + JSON.stringify(res));
        },
        err => {
          console.log('Create new user failed');
        }
      );
      const loginDetailsNew: LoginDetails = {
        userName: userDetails.userName,
        password: userDetails.password,
        id: userDetails.id
      }
      this.dataService.createLoginDetails(loginDetailsNew).subscribe(
        res => {
          console.log('Login Details: ' + JSON.stringify(res));
        },
        err => {
          console.log('In Error');
        },
      );
    }
    this.registerForm.disable();
  }

  cloneValues() {
    console.log('In cloned Va;ues');
    if (this.getParamQuertStringValueForEdit()) {
      this.clonedMemberId = this.getParamQuertStringValueForEdit();
      this.clonedMember = true;
      this.onEdit = true;
      this.registerForm.controls['userName'].disable();
      this.registerForm.controls['inputPassword'].disable();
      this.dataService.getUserDetails(this.clonedMemberId).subscribe(
        res => {
          this.userDetailsModel = res;
          this.changeCountryOnEdit(this.userDetailsModel.country, this.userDetailsModel.state)
          this.registerForm.get('name').setValue(this.userDetailsModel.name);
          this.registerForm.get('userName').setValue(this.userDetailsModel.userName);
          this.registerForm.get('inputPassword').setValue(this.userDetailsModel.password);
          this.registerForm.get('gaurdianType').setValue(this.userDetailsModel.gaurdianType);
          this.registerForm.get('gaurdianName').setValue(this.userDetailsModel.gaurdianName);
          this.registerForm.get('inputAddress1').setValue(this.userDetailsModel.address);
          this.registerForm.get('inputAddress2').setValue(this.userDetailsModel.address2);
          this.registerForm.get('citizenShip').setValue(this.userDetailsModel.citizenShip);
          this.registerForm.get('country').setValue(this.userDetailsModel.country);
          this.registerForm.get('state').setValue(this.selectedState);
          this.registerForm.get('emailAddress').setValue(this.userDetailsModel.emailAddress);
          this.registerForm.get('gender').setValue(this.userDetailsModel.gender);
          this.registerForm.get('maritalStatus').setValue(this.userDetailsModel.maritalStatus);
          this.registerForm.get('contactNo').setValue(this.userDetailsModel.contactNo);
          this.registerForm.get('date').setValue(this.userDetailsModel.dateOfBirth);
          this.registerForm.get('registrationDate').setValue(this.userDetailsModel.registrationDate);
          this.registerForm.get('timeZone').setValue(this.userDetailsModel.timeZone);
          this.registerForm.get('bloodType').setValue(this.userDetailsModel.bloodType);
          this.registerForm.get('countryVisited').setValue(this.userDetailsModel.countryVisited);
          this.registerForm.get('citizenStatus').setValue(this.userDetailsModel.citizenStatus);
          this.registerForm.get('displayName').setValue(this.userDetailsModel.displayName);
          this.registerForm.get('supplierName').setValue(this.userDetailsModel.supplierName);
          this.registerForm.get('ssnNumber').setValue(this.userDetailsModel.ssnNumber);
        }, err => {
          console.log('Fetch user details during edit failed');
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


  changeCountry(count) {
    this.onEdit = false;
    console.log('In change country ' + count);
    this.states = this.countryList.find(con =>
      con.name == count).states;
  }

  changeCountryOnEdit(country: string, state: string) {
    console.log('In change country on Edit ' + country);
    this.states1 = this.countryList.find(con =>
      con.name == country).states;
    this.states1.forEach(state1 => {
      if (state1 == state) {
        this.selectedState = state1;
      }
    });
  }


}
