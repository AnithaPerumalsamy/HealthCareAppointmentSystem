import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgModule, Component } from '@angular/core';

import { LoginComponent } from './login.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DataService } from '../service/DataService';
import { RouterTestingModule } from '@angular/router/testing';
import { validUser, blankUser } from 'src/mocks/';


const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const dataServiceSpy = jasmine.createSpyObj('DataService', ['getLoginDetails']);
let dataSpy;
const testUserData = { userName: 'Anitha', password: 'password' };
const loginErrorMsg = 'Invalid Login';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthService, useValue: authService }, HttpClient, DataService, HttpHandler, { provide: formBuilder, useValue: FormBuilder }],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    router = TestBed.get(Router);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  afterEach(() => {
    authService = null;
    component = null;
  });

  function updateForm(userName, password) {
    component.loginForm.controls['userName'].setValue('Anitha');
    component.loginForm.controls['password'].setValue('password');
  }


  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });


});
