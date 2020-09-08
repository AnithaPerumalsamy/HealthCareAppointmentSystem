import { DataService } from "./DataService"
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginDetails } from "../models/LoginDetails";
import { HttpResponse } from '@angular/common/http';
import { AppointmentDetails } from "../models/AppointmentDetails";

let dataService: DataService,
    httpTestingController: HttpTestingController

describe("DataService", () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService]
        });

        dataService = TestBed.get(DataService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    // Angular default test added when you generate a service using the CLI
    it('service should be created', () => {
        expect(dataService).toBeTruthy();
    });
});

describe('#dataService http Requests', () => {
    it('should return an Observable<LoginDetails[]>', () => {
        const loginDetails = [
            { userName: 'Anitha', password: 'password', id: 'MEM231223' },
            { userName: 'Anitha1', password: 'password1', id: 'MEM231224' }
        ]

        dataService.getLoginDetails().subscribe(res => {
            //  expect(res).toEqual(loginDetails);
            console.log('res' + JSON.stringify);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/loginDetails');
        expect(req.request.method).toBe("GET");
        req.flush(loginDetails);
    });

    it('should return an Observable<UserDetails>', () => {
        const id = "MEM138260";
        const userDetails = [
            {
                i: "MEM138260",
                name: "mcuser",
                userNam: "user",
                password: "user",
                gaurdianType: "husband",
                gaurdianName: "user2",
                address: "23",
                address2: "address",
                citizenShip: "Australian",
                state: "2",
                country: "6",
                emailAddress: "christ@gmail.com",
                gender: "F",
                maritalStatus: "single",
                contactNo: 9965518801,
                dateOfBirth: "2013-05-14T18:30:00.000Z",
                registrationDate: "2020-08-28",
                timeZone: "(GMT -6:00) Central Time (US &amp; Canada), Mexico City",
                bloodType: "O+ve",
                countryVisited: "sdsd",
                citizenStatus: "Minor Citizen",
                displayName: "sdsd",
                supplierName: "Supplier 1",
                ssnNumber: "5frt5"
            },
            {
                id: "MEM222520",
                name: "test country",
                userName: "country",
                password: "country",
                gaurdianType: "father",
                gaurdianName: "rt",
                address: "67",
                address2: "yu",
                citizenShip: "Indian citizen",
                state: "TamilNadu",
                country: "India",
                emailAddress: "user@gmail.com",
                gender: "F",
                maritalStatus: "single",
                contactNo: 7890654325,
                dateOfBirth: "2014-08-12T18:30:00.000Z",
                registrationDate: "2020-08-29",
                timeZone: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
                bloodType: "O+ve",
                countryVisited: "India",
                citizenStatus: "Minor Citizen",
                displayName: "Tesr user",
                supplierName: "dssd",
                ssnNumber: "ssn785"
            }];

        dataService.getUserDetails(id).subscribe(res => {
            expect(res).toEqual(userDetails[id]);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/userDetails/' + id);
        expect(req.request.method).toBe("GET");
        // req.flush(userDetails);
    });

    it('get appointment details  & should return an Observable<AppointmentDetails>', () => {
        const id = "MEM138260";
        const appointmentDetails = [
            {
                timeZone: "(GMT -6:00) Central Time (US &amp; Canada), Mexico City",
                appointmentType: "Private",
                startDate: "12/09/2020",
                title: "Chekcup",
                startTime: "12:00",
                endTime: "10:00",
                location: "cog",
                comments: "review",
                memberId: "MEM223305",
                id: "APP236698"
            },
            {
                timeZone: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
                appointmentType: "Private",
                startDate: "25/09/2020",
                title: "Checkup",
                startTime: "12:00",
                endTime: "16:00",
                location: "kmch",
                comments: "review",
                memberId: "MEM980821",
                id: "APP149844"
            }];

        dataService.getAppointmentDetails(id).subscribe(res => {
            expect(res).toEqual(appointmentDetails[id]);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/appointmentDetails/' + id);
        expect(req.request.method).toBe("GET");
        // req.flush(userDetails);
    });

    it('should put the correct data', () => {
        const id = "APP236698";
        const appointmentDetails: AppointmentDetails = {
            timeZone: "(GMT -6:00) Central Time (US &amp; Canada), Mexico City",
            appointmentType: "Private",
            startDate: "12/09/2020",
            title: "Chekcup",
            startTime: "12:00",
            endTime: "10:00",
            location: "cog",
            comments: "review",
            memberId: "MEM223305",
            id: "APP236698"
        };

        dataService.updateAppointmentDetails(appointmentDetails, id).subscribe(res => {
            // expect(data.startTime).toBe('startTime');
        });

        const req = httpTestingController.expectOne(
            `http://localhost:3000/appointmentDetails/` + id,
            'put to api'
        );
        expect(req.request.method).toBe('PUT');

        ///  req.flush({
        //   startTime: 'fi12:00rstname'
        // });


    });
});

