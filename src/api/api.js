import { getUserData, setUserData, clearUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            //handle err
            const error = await response.json();
            throw new Error(error.error);
        }

        return response.json();
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'VuJrrPHBYEURxbePKWiLj0l5gRNj1MzrQ3gOpigD',
            'X-Parse-REST-API-Key': 'oyCsHxcYPBVSvY4lu5b0CqGS22kcOI51g3y4MntU'
        }
    };

    const userData = getUserData();
    if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.token;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const username = email.split('@')[0];
    const result = await post('/login', { username, password });

    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken
    };
    setUserData(userData);

    return result;
}

export async function register(email, password) {
    const username = email.split('@')[0];
    const result = await post('/users', { username, email, password });

    const userData = {
        username: email,
        id: result.objectId,
        token: result.sessionToken
    };
    setUserData(userData);

    return result;
}

export async function logout() {
    post('/logout');
    clearUserData();
}