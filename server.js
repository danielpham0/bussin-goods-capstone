import express from 'express';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import cors from 'cors'

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO: Add cors options so that it's just for our front-end
app.use(cors())

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

const port = 3001;

app.listen(port, () => `Server running on port ${port}`);