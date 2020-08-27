import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDetails } from '../models/LoginDetails';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


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
    private authService: AuthService) { }

  ngOnInit(): void {

    this.http.get('./assets/Anitha.json')
      .subscribe((data) => this.displaydata(data));

    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  displaydata(data) {
    this.loginDetails = data;
    console.log('Input JSON file users ' + JSON.stringify(this.loginDetails));
  }

  loginUser() {
    console.log(this.loginForm.get('userName').value);
    console.log(this.loginForm.get('password').value);
    this.isValidUser = false;
    if (this.loginDetails != null) {
      this.loginDetails.forEach(loginDetail => {
        if (loginDetail.userName === this.loginForm.get('userName').value) {
          if (loginDetail.password === this.loginForm.get('password').value) {
            this.isValidUser = true;
            this.memberId = loginDetail.memberId
            this.authService.setLoggedInUserLocal(loginDetail);
            console.log(this.memberId);
          } else {
            this.isValidUser = false;
          }
        }
      });
    }
    if (this.isValidUser) {
      console.log('Valid User');
      console.log(this.authService.getLoggedInUserLocal());
      this.router.navigateByUrl('/');
    } else {
      console.log('InValid User');
      this.errorMessage = 'User doesnt exist. Kindly Register to login';
    }
  }

  get loginFormCtrl() {
    return this.loginForm.controls;
  }


}
