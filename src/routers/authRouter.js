import express from 'express';
import debug from 'debug';
import {getUserBy} from '../repo/dataRepo.js';

export const authRouter = express.Router();
const log = debug('app:authRouter');
import {addUser} from '../repo/dataRepo.js';

authRouter.post('/signUp', (req, res) => {
    const {username, password} = req.body;
    const user = {username, password}
    addUser(user)
        .then((results) => {
            log(results);
            getUserBy(results.insertedId).then(user=>{
                log(user);
                req.login(user, () => {
                    res.redirect('/auth/profile');
                });
            }).catch(e => log(e));
        }).catch(e => log(e))
});

authRouter.get('/profile', (req, res) => {
    res.json(req.user);
});