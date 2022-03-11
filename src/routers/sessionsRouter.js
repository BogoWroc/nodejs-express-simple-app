import express from 'express';
import debug from 'debug';
import {getSessions, getSessionBy} from '../repo/dataRepo.js';

export const sessionsRouter = express.Router();
const log = debug('app:sessionRouter');

sessionsRouter.use((req,res, next)=>{
    if(req.user){
        next();
    }else {
        res.redirect('/auth/signIn');
    }
});

sessionsRouter.route('/')
    .get((req, res) => {
        getSessions()
            .then((sessions) => {
                    res.render('sessions', {
                        sessions,
                    });
                })
            .catch(e => log(e.stack) )
    });

sessionsRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        getSessionBy(id)
            .then(session =>{
                res.render('session', { session });
            })
            .catch(e => log(e.stack))
    });
