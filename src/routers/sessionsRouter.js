import express from 'express';
import { readFile } from 'fs/promises';

export const sessionsRouter = express.Router();

export const sessions = JSON.parse(
    await readFile(
        new URL('../data/sessions.json', import.meta.url)
    )
);

sessionsRouter.route('/')
    .get((req,res)=>{
        res.render('sessions', {
            sessions,
        });
    });

sessionsRouter.route('/:id')
    .get((req,res)=>{
        const id = req.params.id;

        res.render('session', {
            session: sessions[id],
        });
    });
