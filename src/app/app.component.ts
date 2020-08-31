import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppointmentSystem';
  loginSuccess: boolean;
  loggedInMember: string;
  myImage: string = "assets/appointment.png";

  constructor(private authService: AuthService,
    private router: Router,
  ) {
    console.log('LoggedInUserMethod in view page');
    this.loggedInMember = this.authService.getLoggedInUserLocal();
    console.log('MemberId in view ' + this.loggedInMember);

    if (this.loggedInMember === '') {
      console.log('In notlogged in');
      this.loginSuccess = false;
    } else {
      this.loginSuccess = true;
    }
  }

  ngOnInit(): void {

  }

  logOutUser() {
    this.authService.clearLocalStorageUser();
    this.router.navigateByUrl('/');
    this.loginSuccess = false;
  }

}
