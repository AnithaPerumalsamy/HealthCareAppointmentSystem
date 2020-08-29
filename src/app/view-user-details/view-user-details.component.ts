import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDetails } from '../models/UserDetails';
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
  loginSuccess: boolean;
  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    console.log('LoggedInUserMethod in view page');
    this.memberId = this.authService.getLoggedInUserLocal();
    console.log('MemberId in view ' + this.memberId);

    if (this.memberId === '') {
      console.log('In notlogged in');
      this.loginSuccess = false;
    } else {
      this.loginSuccess = true;
    }

    this.viewDetails();
  }

  viewDetails() {
    this.dataService.getUserDetails(this.memberId).subscribe(
      res => {
        console.log('Fetching User details to View ' + JSON.stringify(res));
        this.userDetails = res;
      }, err => {
        console.log('Error occured during fetching user details');
      }
    );
  }
}
