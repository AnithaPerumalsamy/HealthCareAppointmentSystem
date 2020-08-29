import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDetails } from '../models/LoginDetails';
import { UserDetails } from "../models/UserDetails";
import { AppointmentDetails } from "../models/AppointmentDetails";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const api_url_loginDetails = 'http://localhost:3000/loginDetails';
const api_url_userDetails = 'http://localhost:3000/userDetails';
const api_url_appointmentDetails = 'http://localhost:3000/appointmentDetails';
const directory_separator = '/';

@Injectable()
export class DataService {

    public headersAuth = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
        //Authorization: 'Basic'
    })

    public httpOptionsAuth = {
        headers: this.headersAuth
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log('${operation} failed: ${error.message}');
            return of(result as T);
        };
    }

    public log(message: string) {
        console.log('Message: ${message}');
    }

    constructor(private http: HttpClient) { }

    getLoginDetails(): Observable<LoginDetails[]> {
        return this.http.get<any[]>(api_url_loginDetails, this.httpOptionsAuth)
            .pipe(catchError(this.handleError<LoginDetails[]>()));
    }

    createLoginDetails(loginDetails: LoginDetails): Observable<LoginDetails> {
        return this.http.post<LoginDetails>(api_url_loginDetails, loginDetails, this.httpOptionsAuth)
            .pipe(catchError(this.handleError<LoginDetails>()));
    }

    createUser(userDetails: UserDetails): Observable<UserDetails> {
        return this.http.post<UserDetails>(api_url_userDetails, userDetails, this.httpOptionsAuth)
            .pipe(catchError(this.handleError<UserDetails>()));
    }

    updateUser(userDetails: UserDetails, id: string): Observable<UserDetails> {
        return this.http.put<UserDetails>(api_url_userDetails + directory_separator + id, userDetails, this.httpOptionsAuth)
            .pipe(catchError(this.handleError<UserDetails>()));;
    }

    getUserDetails(id: string) {
        return this.http.get(api_url_userDetails + directory_separator + id)
            .pipe(catchError(this.handleError<any>()));
    }

    createAppointment(appointmentDetails: AppointmentDetails): Observable<AppointmentDetails> {
        return this.http.post<AppointmentDetails>(api_url_appointmentDetails, appointmentDetails, this.httpOptionsAuth)
            .pipe(catchError(this.handleError<AppointmentDetails>()));
    }

    updateAppointmentDetails(appointmentDetails: AppointmentDetails, id: string): Observable<AppointmentDetails> {
        return this.http.put<AppointmentDetails>(api_url_appointmentDetails + directory_separator + id, appointmentDetails, this.httpOptionsAuth)
            .pipe(catchError(this.handleError<AppointmentDetails>()));
    }

    getAppointmentDetails(id: string) {
        return this.http.get(api_url_appointmentDetails + directory_separator + id)
            .pipe(catchError(this.handleError<any>()));
    }

    deleteAppointment(id: string) {
        this.http.delete(api_url_appointmentDetails + directory_separator + id)
            .pipe(catchError(this.handleError<any>()));
    }

    deleteUserDetails(id: string) {
        return this.http.delete(api_url_userDetails + directory_separator + id)
            .pipe(catchError(this.handleError<any>()));
    }

    deleteLoginDetails(id: string) {
        return this.http.delete(api_url_loginDetails + directory_separator + id)
            .pipe(catchError(this.handleError<any>()));
    }

    deleteAppointmentDetails(id: string) {
        return this.http.delete(api_url_appointmentDetails + directory_separator + id)
            .pipe(catchError(this.handleError<any>()));
    }


}