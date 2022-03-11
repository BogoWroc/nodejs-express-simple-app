import passport from 'passport';
import {Strategy} from 'passport-local';

export function localStrategy() {

    passport.use(new Strategy({
        usernameField: "username", // these field names are taken from login form
        passwordField: "password"
    }, (username, password, done) => {
        const user = {username, password, 'name': 'John'}; //here we have to connect with db or ldap to authenticate the user and then prepare user object
        done(null, user);
    })) // this method is responsible for user authentication
}