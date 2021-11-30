import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment'
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private blankUser = {} as User;

    constructor(private http: HttpClient) {     
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        console.log(email, password)
        return this.http.post<any>(`${environment.apiUrl.authUrl}/sign-in`, { email, password })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response
                
                const user = data.user
                console.log(user)
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.accessToken = data.accessToken
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(this.blankUser);
    }
}