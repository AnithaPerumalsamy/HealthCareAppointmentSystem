import { Component, OnInit } from '@angular/core';
import { AppointmentDetails } from '../models/AppointmentDetails';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/DataService';
import { Router } from '@angular/router';
import { UserDetails } from '../models/UserDetails';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {


  memberId: string;
  userDetails: UserDetails;
  userDeletedSuccess = false;
  constructor(private authService: AuthService,
    private dataService: DataService,
    private router: Router) { }


  ngOnInit(): void {
    this.deleteUserDetails();
  }

  deleteUserDetails() {
    this.userDetails == null;
    if (this.getParamQueryStringValue()) {
      console.log('delete member id ' + this.getParamQueryStringValue());
      this.dataService.deleteUserDetails(this.getParamQueryStringValue()).subscribe();
      this.dataService.deleteAppointmentDetails(this.getParamQueryStringValue()).subscribe();
      this.dataService.deleteLoginDetails(this.getParamQueryStringValue()).subscribe();
      this.userDeletedSuccess = true;
    }
  }

  getParamQueryStringValue() {
    const url = this.router.url;
    if (url.includes('delete')) {
      const httpParams = url.split('/');
      console.log(httpParams);
      if (httpParams[4]) {
        console.log('param in delete ' + httpParams[3]);
        return httpParams[4];
      }
    }
  }
}
