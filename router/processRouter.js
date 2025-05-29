import express from 'express';

import { processController } from '../controller/initializeController.js';

const router = express.Router();

router.get('/process', processController.getAllProcesses.bind(processController));
//router.get
//router.post
//router.put
//router.delete

export default router;