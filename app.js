// -  Add   "type": "module" into the package.json file to activate ES module convention
// - Activate debug: use env DEBUG=app or DEBUG=*
// - morgan library: register requests. It is a middleware.
//   ::ffff:127.0.0.1 - - [07/Mar/2022:08:40:05 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0"

import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import passport from 'passport'; // it is responsible for managing user in the session, cookies, etc.
import {passportConfig} from "./src/config/passport.js";
import cookieParser from 'cookie-parser';
import session from 'cookie-session'

import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {sessionsRouter} from './src/routers/sessionsRouter.js';
import {adminRouter} from './src/routers/adminRouter.js';
import {authRouter} from './src/routers/authRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

const log = debug('app');
const app = express();

// register middleware
app.use(morgan('combined')); // register logger middleware
app.use(express.static(path.join(__dirname, '/public/'))); // expose all static resources stored in the public folder
app.use(express.json()); // for authorization, body parser
app.use(express.urlencoded({extended: false})); // for authorization
app.use(cookieParser());
app.use(session({secret: 'globomantics'}));

passportConfig(app);

// by default index.html is search at '/' request.

// set template view engine to render html pages
app.set('views', './src/views');
app.set('view engine', 'ejs');

// request routing


app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', {title: 'Globo!', data: ['a', 'b', 'c']});
});
app.get('/test', (req, res) => {
    res.send('Hello from my app!');
});

// server startup at ports
app.listen(PORT, () => {
    log(`listen on the port  ${chalk.green(PORT)}`);
});