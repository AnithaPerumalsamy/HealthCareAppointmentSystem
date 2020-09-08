
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from "./auth.service";
import { LoginDetails } from "../models/LoginDetails";

let authService: AuthService,
    httpTestingController: HttpTestingController

let store = {};

const mockLocalStorage = {
    getItem: (key: string): string => {
        return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
        store[key] = `${value}`;
    },
    removeItem: (key: string) => {
        delete store[key];
    },
    clear: () => {
        store = {};
    }


};



describe("AuthService", () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });


        spyOn(localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem')
            .and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem')
            .and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear')
            .and.callFake(mockLocalStorage.clear);

        authService = TestBed.get(AuthService);
        httpTestingController = TestBed.get(HttpTestingController);
    });


    afterEach(() => {
        httpTestingController.verify();
    });

    // Angular default test added when you generate a service using the CLI
    it('service should be created', () => {
        expect(authService).toBeTruthy();
    });
});



describe('setLoggedInUserLocal', () => {
    it('should store the loggedIn ID in localStorage',
        () => {
            const loginDetails: LoginDetails = {
                userName: 'Anitha', password: 'password', id: 'MEM231223'
            }

            authService.setLoggedInUserLocal(loginDetails);
            localStorage.setItem('id_token', loginDetails.id);
            // localStorage.setItem(keyLoggedInMemberId, loginDetails.id);
            expect(localStorage.getItem('id_token')).toEqual(loginDetails.id);
        });
});

describe('getLoggedInUserLocal', () => {
    it('should return stored loggedIn ID  from localStorage',
        () => {
            localStorage.setItem('id_token', 'MEM231223');
            expect(authService.getLoggedInUserLocal()).toEqual('MEM231223');
        });
});




