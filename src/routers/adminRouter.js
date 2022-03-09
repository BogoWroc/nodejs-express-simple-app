import express from 'express';
import debug from 'debug';
import {insert} from '../repo/dataRepo.js';
import {sessions} from "./sessionsRouter.js";

export const adminRouter = express.Router();
const log = debug('app:adminRouter');

adminRouter.get('/', (req, res) => {
    insert(sessions)
        .then((r) => res.json(r))
        .catch((e) => log(e.stack));
});