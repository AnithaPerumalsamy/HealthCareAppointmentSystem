import { Injectable } from "@angular/core";
import { LoginDetails } from "../models/LoginDetails";

const keyLoggedInUserName = 'loggedInUser';
const keyLoggedInMemberId = 'loggedInMemberId';
@Injectable()
export class AuthService {

    setLoggedInUserLocal(loginDetail: LoginDetails) {
        console.log('In setlocal storage');
        localStorage.setItem(keyLoggedInUserName, loginDetail.userName);
        localStorage.setItem(keyLoggedInMemberId, loginDetail.id);
    }

    getLoggedInUserLocal() {
        console.log('In getlocal storage');
        if (localStorage.hasOwnProperty(keyLoggedInMemberId)) {
            console.log('storage memberId ' + localStorage.getItem(keyLoggedInMemberId));
            return localStorage.getItem(keyLoggedInMemberId);
        } else {
            return '';
        }
    }

    clearLocalStorageUser() {
        localStorage.clear();
    }

}