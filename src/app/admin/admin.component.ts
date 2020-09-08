import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/DataService';
import { AppointmentDetails } from '../models/AppointmentDetails';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  appointmentDetails: AppointmentDetails[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getAllAppointments().subscribe(res => {
      this.appointmentDetails = res;
    });
  }

}
