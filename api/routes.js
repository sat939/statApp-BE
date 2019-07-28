import express from 'express';
import impl from './Impl/services.js';

let router = express.Router();

router
        .route('/totalCount')
        .get(impl.totalCount)


module.exports = router;
