import { Component, OnInit } from '@angular/core';
import { cloneValues, RegisterComponent } from '../register/register.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDetails } from '../models/UserDetails';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from '../service/DropDownService';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}

