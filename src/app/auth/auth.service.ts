import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=***REMOVED***',
            {
                email: email,
                password: password,
                returnSecureToken: true

            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuth(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=***REMOVED***',
            {
                email: email,
                password: password,
                returnSecureToken: true

            }).pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn);
                })
            );
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.tokenExpTimer) {
            clearTimeout(this.tokenExpTimer);
        }
        this.tokenExpTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpiration: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpiration));
        
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = 
                new Date(userData._tokenExpiration).getTime() - 
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuth(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkown error occurred.';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already in use.'
                break;
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Invalid e-mail or password.'
                break;
        }
        return throwError(errorMessage);
    }

}