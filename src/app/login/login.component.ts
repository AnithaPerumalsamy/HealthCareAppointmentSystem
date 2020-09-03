import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDetails } from '../models/LoginDetails';


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/DataService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  loginDetails: LoginDetails[] = [];
  isValidUser = false;
  loginForm: FormGroup;
  errorMessage: string;
  memberId: string;

  arrBirds: string[];

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  loginUser() {
    console.log(this.loginForm.get('userName').value);
    console.log(this.loginForm.get('password').value);
    this.isValidUser = false;
    this.dataService.getLoginDetails().subscribe(
      res => {
        this.loginDetails = res;
        console.log('Data' + JSON.stringify(this.loginDetails));
        this.loginDetails.forEach(loginDetail => {
          if (loginDetail.userName === this.loginForm.get('userName').value) {
            if (loginDetail.password === this.loginForm.get('password').value) {
              console.log('In valid');
              this.isValidUser = true;
              this.memberId = loginDetail.id
              this.authService.setLoggedInUserLocal(loginDetail);
              console.log(this.memberId);
            } else {
              this.isValidUser = false;
            }
          }
        });
        if (this.isValidUser) {
          console.log(this.authService.getLoggedInUserLocal());
          this.router.navigateByUrl('/');
        } else {
          this.errorMessage = 'Invalid UserName or Password. If you are new user kindly click on Register to login.';
        }
      },
      err => {
        console.log('Error response returned during fetching login details');
      });

  }

  get loginFormCtrl() {
    return this.loginForm.controls;
  }

}
