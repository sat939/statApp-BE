'use strict'
import express from 'express';
import routes from './api/routes';

let app = express();

app.use('/',routes);
    
app.listen(3000);
