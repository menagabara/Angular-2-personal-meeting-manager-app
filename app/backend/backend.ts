import { Http, BaseRequestOptions} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {Response, ResponseOptions} from '@angular/http';
import {RequestMethod, XHRBackend, RequestOptions } from '@angular/http';

export function backend(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    let users_array: any[] = JSON.parse(localStorage.getItem('users')) || [];

    backend.connections.subscribe((connection: MockConnection) => {
        setTimeout(() => {
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                let params = JSON.parse(connection.request.getBody());
                let filteredUsers_array = users_array.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers_array.length) {
                    let iuser = filteredUsers_array[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: iuser.id,
                            username: iuser.username,
                            firstName: iuser.firstName,
                            lastName: iuser.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    connection.mockError(new Error('Username or password is incorrect,Please input valid data.'));
                }
                return;
            }

            // get users_array
            if (connection.request.url.endsWith('/api/users_array') && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users_array })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // get by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users_array.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }

            // create new iuser
            if (connection.request.url.endsWith('/api/users_array') && connection.request.method === RequestMethod.Post) {
                let newUser = JSON.parse(connection.request.getBody());

                let duplicateUser = users_array.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                }
                newUser.id = users_array.length + 1;
                users_array.push(newUser);
                localStorage.setItem('users_array', JSON.stringify(users_array));

                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete iuser
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users_array.length; i++) {
                        let user = users_array[i];
                        if (user.id === id) {
                            users_array.splice(i, 1);
                            localStorage.setItem('users_array', JSON.stringify(users_array));
                            break;
                        }
                    }
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            //error handling.
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let b_Provider = {
    provide: Http, //provider
    useFactory: backend,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};