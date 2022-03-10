import express from 'express';
import debug from 'debug';
import {insertData} from '../repo/dataRepo.js';

export const authRouter = express.Router();
const log = debug('app:authRouter');

authRouter.post('/signUp', (req, res) => {
   res.json(req.body);
});