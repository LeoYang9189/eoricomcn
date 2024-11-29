import express from 'express';
import EoriController from '../controllers/eoriController.js';

const router = express.Router();

router.post('/validate', EoriController.validate);
router.get('/health', EoriController.health);

export default router; 