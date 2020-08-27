import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDetails } from '../models/UserDetails';

import { cloneValues, RegisterComponent } from '../register/register.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from '../service/DropDownService';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css']
})
export class ViewUserDetailsComponent implements OnInit {

  memberId: string;
  userDetails: UserDetails;
  editClicked = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log('LoggedInUserMethod in view page');
    this.memberId = this.authService.getLoggedInUserLocal();
    console.log('MemberId in view ' + this.memberId);
    this.viewDetails();
  }

  viewDetails() {
    this.userDetails = JSON.parse(localStorage.getItem(this.memberId));
    console.log('Getting User details ' + JSON.stringify(this.userDetails));
  }
}
