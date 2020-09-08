import { Injectable } from "@angular/core";
import { LoginDetails } from "../models/LoginDetails";

const keyLoggedInUserName = 'loggedInUser';
const keyLoggedInMemberId = 'loggedInMemberId';
@Injectable()
export class AuthService {

    setLoggedInUserLocal(loginDetail: LoginDetails) {
        localStorage.setItem(keyLoggedInUserName, loginDetail.userName);
        localStorage.setItem(keyLoggedInMemberId, loginDetail.id);
    }

    getLoggedInUserLocal() {

        return localStorage.getItem(keyLoggedInMemberId);
        // if (localStorage.hasOwnProperty(keyLoggedInMemberId)) {
        //    console.log('storage memberId ' + localStorage.getItem(keyLoggedInMemberId));
        ///     return localStorage.getItem(keyLoggedInMemberId);
        // } else {
        //     return '';
        //  }
    }

    clearLocalStorageUser() {
        localStorage.clear();
    }

}