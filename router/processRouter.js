import express from 'express';

import { processController } from '../controller/initializeController.js';

const router = express.Router();

router.get('/process', processController.getAllProcesses.bind(processController));
router.get('/process/:id', processController.getProcess.bind(processController));
router.post('/process/', processController.createProcess.bind(processController));
router.put('/process/:id', processController.updateProcess.bind(processController));
router.delete('/process/:id', processController.deleteProcess.bind(processController));

export default router;