import express from 'express';
import debug from 'debug';
import {readFile} from 'fs/promises';
import {get, getBy} from '../repo/dataRepo.js';

export const sessionsRouter = express.Router();
const log = debug('app:sessionRouter');

export const sessions = JSON.parse(
    await readFile(
        new URL('../data/sessions.json', import.meta.url)
    )
);

sessionsRouter.route('/')
    .get((req, res) => {
        get()
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
        getBy(id)
            .then(session =>{
                res.render('session', { session });
            })
            .catch(e => log(e.stack))
    });
