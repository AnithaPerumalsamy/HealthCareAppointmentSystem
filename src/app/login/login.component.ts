import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDetails } from '../models/LoginDetails';
import { Location } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/DataService';

import {
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory
} from '@angular/core';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter<LoginDetails>();

  userName: string;
  password: string;
  loginDetails: LoginDetails[] = [];
  isValidUser = false;
  loginForm: FormGroup;
  errorMessage: string;
  memberId: string;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;



  private _message = 'Welcome ';

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService, private dataService: DataService,
    private componentFactoryResolver: ComponentFactoryResolver, private location: Location) { }

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
          if (this.authService.getLoggedInUserLocal() === 'MEMADMIN') {
            this.add();
          }
          else {
            this.router.navigateByUrl('/');
            this.location.go('/');
            window.location.reload();
          }
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

  add(): void {

    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);

    // add the component to the view
    const componentRef = this.container.createComponent(componentFactory);

    // pass some data to the component
    componentRef.instance.index = this._message + this.loginForm.get('userName').value;
  }


}
