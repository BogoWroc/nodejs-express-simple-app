import passport from 'passport';
import {Strategy} from 'passport-local';
import {getUserByName} from "../../repo/dataRepo.js";

export function localStrategy() {

    passport.use(new Strategy({
        usernameField: "username", // these field names are taken from login form
        passwordField: "password"
    }, (username, password, done) => {
        getUserByName(username).then(user=>{
            if(user && user.password === password){
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch(
            e=>done(e, false));

    })) // this method is responsible for user authentication
}