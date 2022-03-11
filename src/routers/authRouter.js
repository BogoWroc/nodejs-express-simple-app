import express from 'express';
import debug from 'debug';
import {getUserBy} from '../repo/dataRepo.js';

export const authRouter = express.Router();
const log = debug('app:authRouter');
import {addUser} from '../repo/dataRepo.js';
import passport from "passport";

authRouter.post('/signUp', (req, res) => {
    const {username, password} = req.body;
    const user = {username, password}
    addUser(user)
        .then((results) => {
            log(results);
            getUserBy(results.insertedId).then(user => {
                log(user);
                req.login(user, () => {
                    res.redirect('/auth/profile');
                });
            }).catch(e => log(e));
        }).catch(e => log(e))
});

authRouter.route('/signIn').get((req, res) => {
    res.render('signin');
}).post(
    passport.authenticate(
        'local',
        {failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/auth/profile');
    }
);


authRouter.get('/profile', (req, res) => {
    res.json(req.user);
});