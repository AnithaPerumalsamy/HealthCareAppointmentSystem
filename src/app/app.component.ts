import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppointmentSystem';
  loginSuccess = false;
  loggedInMember: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOutUser() {
    this.authService.clearLocalStorageUser();
  }

}
