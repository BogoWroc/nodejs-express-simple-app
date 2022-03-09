import express from 'express';
import debug from 'debug';
import {insertData} from '../repo/dataRepo.js';

export const adminRouter = express.Router();
const log = debug('app:adminRouter');

adminRouter.get('/', (req, res) => {
    insertData()
        .then((r) => res.json(r))
        .catch((e) => log(e.stack));
});