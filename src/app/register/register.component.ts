import { Component, OnInit } from '@angular/core';
import { DropDownType } from '../app.const';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDetails } from '../models/UserDetails';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/Country';
import { State } from '../models/State';
import { DropDownService } from '../service/DropDownService';
import { AuthService } from '../service/auth.service';
import { LoginDetails } from '../models/LoginDetails';
import { Router } from '@angular/router';
export function cloneValues() {

}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  GaurdianTypes: DropDownType[] = [
    { id: 'father', name: 'Father' },
    { id: 'husband', name: 'Husband' },
    { id: 'other', name: 'Other' }
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
    { id: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City', name: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City' }
  ];

  BloodTypes: DropDownType[] = [
    { id: 'O+ve', name: 'O+ve' },
    { id: 'O-ve', name: 'O-ve' }
  ];

  registerForm: FormGroup;
  age: number;
  citizenStatus: string;
  randomMemberId: string = '';
  computedDate: string;
  countries: Country[];
  states: State[];
  selectedCountry: Country = new Country(1, 'India');
  minDate: Date;
  maxDate: Date;
  userDetailsModel: UserDetails;
  loginDetails: LoginDetails;
  clonedMember: boolean;
  registrationSuccess: boolean;
  registrationCloneSuccess: boolean;
  clonedMemberId: string;
  disableRegistrationDate = false;

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropDownService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());

    this.countries = this.dropDownService.getCountries();
    this.onSelect(this.selectedCountry.id);

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

    this.cloneValues();
  }

  get registerFormCtrl() {
    return this.registerForm.controls;
  }

  onSelect(countryid) {
    this.states = this.dropDownService.getStates().filter((item) => item.countryid == countryid);
  }

  getDate() {
    var today = new Date();
    this.registerForm.get('registrationDate').setValue(today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2));
    this.disableRegistrationDate = true;
  }

  public ageFromDateOfBirthday() {
    const today = new Date();
    const birthDate = new Date(this.registerForm.get('date').value);
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
  }


  registerUser() {
    this.registrationSuccess = false;
    console.log('in register user');
    if (!this.clonedMember) {
      this.randomMemberId = 'MEM' + Math.floor(100000 + Math.random() * 900000);
      console.log(this.randomMemberId);
    }
    console.log('Empty ' + this.randomMemberId);
    const userDetails: UserDetails = {
      memberid: this.randomMemberId,
      name: this.registerForm.get('name').value,
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('inputPassword').value,
      gaurdianType: this.registerForm.get('gaurdianType').value,
      gaurdianName: this.registerForm.get('gaurdianName').value,
      address: this.registerForm.get('inputAddress1').value,
      address2: this.registerForm.get('inputAddress2').value,
      citizenShip: this.registerForm.get('citizenShip').value,
      state: this.registerForm.get('country').value,
      country: this.registerForm.get('state').value,
      emailAddress: this.registerForm.get('emailAddress').value,
      gender: this.registerForm.get('gender').value,
      maritalStatus: this.registerForm.get('maritalStatus').value,
      contactNo: this.registerForm.get('contactNo').value,
      dateOfBirth: this.registerForm.get('date').value,
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
      console.log('User Details Entered after cloning' + JSON.stringify(userDetails));
      console.log('from login authservice to fetch the existing member' + this.authService.getLoggedInUserLocal());
      localStorage.setItem(this.authService.getLoggedInUserLocal(), JSON.stringify(userDetails));
      console.log('User Details from Storage after cloning submit ' + localStorage.getItem(this.authService.getLoggedInUserLocal()));
    } else {
      this.registrationSuccess = true;
      console.log('User Details Entered ' + JSON.stringify(userDetails));
      localStorage.setItem("MEM123456", JSON.stringify(userDetails));
      console.log('User Details from Storage ' + localStorage.getItem(userDetails.memberid));
    }

  }

  cloneValues() {
    console.log('Cloning Method');
    if (this.getParamQueryStringValue()) {
      this.clonedMemberId = this.getParamQueryStringValue();
      this.clonedMember = true;
      console.log('In clone Values');
      console.log('from login authservice' + this.clonedMemberId);
      // this.loginDetails = this.authService.getLoggedInUserLocal();
      console.log('final fetch' + localStorage.getItem(this.clonedMemberId));
      this.userDetailsModel = JSON.parse(localStorage.getItem(this.clonedMemberId));
      this.registerForm.get('name').setValue(this.userDetailsModel.name);
      this.registerForm.get('userName').setValue(this.userDetailsModel.userName);
      this.registerForm.get('inputPassword').setValue(this.userDetailsModel.password);
      this.registerForm.get('gaurdianType').setValue(this.userDetailsModel.gaurdianType);
      this.registerForm.get('gaurdianName').setValue(this.userDetailsModel.gaurdianName);
      this.registerForm.get('inputAddress1').setValue(this.userDetailsModel.address);
      this.registerForm.get('inputAddress2').setValue(this.userDetailsModel.address2);
      this.registerForm.get('citizenShip').setValue(this.userDetailsModel.citizenShip);
      this.registerForm.get('country').setValue(this.userDetailsModel.country);
      this.registerForm.get('state').setValue(this.userDetailsModel.state);
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
    }
  }

  getParamQueryStringValue() {
    const url = this.router.url;
    if (url.includes('/')) {
      const httpParams = url.split('/');
      console.log(httpParams);
      if (httpParams[3]) {
        return httpParams[3];
      }
    }

  }
}