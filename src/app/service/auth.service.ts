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

    }

    clearLocalStorageUser() {
        localStorage.clear();
    }

}