"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var testing_1 = require("@angular/http/testing");
var http_2 = require("@angular/http");
var http_3 = require("@angular/http");
function backend(backend, options, realBackend) {
    var users_array = JSON.parse(localStorage.getItem('users')) || [];
    backend.connections.subscribe(function (connection) {
        setTimeout(function () {
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === http_3.RequestMethod.Post) {
                var params_1 = JSON.parse(connection.request.getBody());
                var filteredUsers_array = users_array.filter(function (user) {
                    return user.username === params_1.username && user.password === params_1.password;
                });
                if (filteredUsers_array.length) {
                    var iuser = filteredUsers_array[0];
                    connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({
                        status: 200,
                        body: {
                            id: iuser.id,
                            username: iuser.username,
                            firstName: iuser.firstName,
                            lastName: iuser.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                }
                else {
                    connection.mockError(new Error('Username or password is incorrect,Please input valid data.'));
                }
                return;
            }
            // get users_array
            if (connection.request.url.endsWith('/api/users_array') && connection.request.method === http_3.RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({ status: 200, body: users_array })));
                }
                else {
                    connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({ status: 401 })));
                }
                return;
            }
            // get by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === http_3.RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    var urlParts = connection.request.url.split('/');
                    var id_1 = parseInt(urlParts[urlParts.length - 1]);
                    var matchedUsers = users_array.filter(function (user) { return user.id === id_1; });
                    var user = matchedUsers.length ? matchedUsers[0] : null;
                    connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({ status: 200, body: user })));
                }
                else {
                    connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({ status: 401 })));
                }
                return;
            }
            // create new iuser
            if (connection.request.url.endsWith('/api/users_array') && connection.request.method === http_3.RequestMethod.Post) {
                var newUser_1 = JSON.parse(connection.request.getBody());
                var duplicateUser = users_array.filter(function (user) { return user.username === newUser_1.username; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser_1.username + '" is already taken'));
                }
                newUser_1.id = users_array.length + 1;
                users_array.push(newUser_1);
                localStorage.setItem('users_array', JSON.stringify(users_array));
                connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({ status: 200 })));
                return;
            }
            // delete iuser
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === http_3.RequestMethod.Delete) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    var urlParts = connection.request.url.split('/');
                    var id = parseInt(urlParts[urlParts.length - 1]);
                    for (var i = 0; i < users_array.length; i++) {
                        var user = users_array[i];
                        if (user.id === id) {
                            users_array.splice(i, 1);
                            localStorage.setItem('users_array', JSON.stringify(users_array));
                            break;
                        }
                    }
                    connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({ status: 200 })));
                }
                else {
                    connection.mockRespond(new http_2.Response(new http_2.ResponseOptions({ status: 401 })));
                }
                return;
            }
            //error handling.
            var realHttp = new http_1.Http(realBackend, options);
            var requestOptions = new http_3.RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe(function (response) {
                connection.mockRespond(response);
            }, function (error) {
                connection.mockError(error);
            });
        }, 500);
    });
    return new http_1.Http(backend, options);
}
exports.backend = backend;
;
exports.b_Provider = {
    provide: http_1.Http,
    useFactory: backend,
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions, http_3.XHRBackend]
};
//# sourceMappingURL=backend.js.map