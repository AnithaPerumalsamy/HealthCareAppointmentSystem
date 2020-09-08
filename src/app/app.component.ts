import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AuthService } from './service/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import 'lodash';

declare var _: any;


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

  observable: Observable<boolean>

  constructor(@Inject(PLATFORM_ID) private _platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {

    console.log('lodash randaom' + _.random(1, 100));
    if (isPlatformBrowser(this._platformId)) {
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

  }



  ngOnInit(async): void {
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



  logOutUser() {
    console.log('logged out');
    this.authService.clearLocalStorageUser();
    this.router.navigateByUrl('/');
    this.loginSuccess = false;
  }


}
