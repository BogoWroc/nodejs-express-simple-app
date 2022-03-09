import express from 'express';
import debug from 'debug';
import {readFile} from 'fs/promises';
import {get} from '../repo/dataRepo.js';

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

        res.render('session', {
            session: sessions[id],
        });
    });
