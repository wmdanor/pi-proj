import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models/user';
import { Role } from '../models/role';
import { Ipr } from '../models/ipr';


const users: User[] = [
    {
        "id": "zxz",
        "email": "admin",
        "createdAt": "2021-11-24T19:44:08.858Z",
        role: Role.Admin,
        password: "admin",
        "firstName": "admin",
        "lastName": "Advminov",
        "patronymic": "Adminovich",
        "birthDate": "1970-01-01T00:00:00.000Z",
        "passportSeries": "BE",
        "passportNumber": "012345",
        "passportIssueDate": "01.01.2000",
        "passportAuthority": "1234",
        "inn": "0123456789",
        "organizationId": null,
        "organizationPosition": null
    },
    {
        "id": "zxczxczxc",
        "email": "user",
        "createdAt": "2021-11-24T19:44:08.858Z",
        role: Role.Registrar,
        password: "user",
        "firstName": "user",
        "lastName": "userZXC",
        "patronymic": "Adminovich",
        "birthDate": "1970-01-01T00:00:00.000Z",
        "passportSeries": "BE",
        "passportNumber": "012345",
        "passportIssueDate": "01.01.2000",
        "passportAuthority": "1234",
        "inn": "0123456789",
        "organizationId": null,
        "organizationPosition": null
    }
];

const iprs : Ipr[] = [
    {
        id: '1',
        authorPublicNameType: 'leonardo davinchi',
        publicationType: 'Science',
        publicationTitle: 'Architect'
    },
    {
        id: '2',
        authorPublicNameType: 'mikelandgelo',
        publicationType: 'Art',
        publicationTitle: 'Madinna doni'
    },

];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/auth/sign-in') && method === 'POST':
                    return authenticate();
                case url.endsWith('/api/ipr') && method === 'GET':
                    return getIprs();
                case url.match(/\/ipr\/\d+$/) && method === 'GET':
                    return getIprById();
                case url.match(/\/registrar\/\w+$/) && method === 'GET':
                    return getUserById();
                case url.endsWith('/api/registrar?limit=10&offset=0') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions
        function getIprs() {
            return ok(iprs);
        }
        function getIprById() {
            const ipr = iprs.find(x => x.id === idFromUrl());
            return ok(ipr);
        }

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Email or password is incorrect');
            return ok({
                accessToken: user.id,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                }
            });
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser()?.id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body: any) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message: any) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser()?.role === Role.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = headers.get('Authorization')?.split(' ')[1];
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};