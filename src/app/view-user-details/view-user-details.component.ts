import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDetails } from '../models/UserDetails';

import { cloneValues, RegisterComponent } from '../register/register.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from '../service/DropDownService';
import { DataService } from '../service/DataService';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css']
})
export class ViewUserDetailsComponent implements OnInit {

  memberId: string;
  userDetails: UserDetails;
  editClicked = false;
  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    console.log('LoggedInUserMethod in view page');
    this.memberId = this.authService.getLoggedInUserLocal();
    console.log('MemberId in view ' + this.memberId);
    this.viewDetails();
  }

  viewDetails() {
    this.dataService.getUserDetails(this.memberId).subscribe(
      (data: UserDetails) => {
        this.userDetails = data;
      }
    );
  }
}
