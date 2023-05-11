import express from 'express';
import auth from "../middleware/auth.middleware.js";
import { getTankers, getTankerById, createTanker, updateTanker, deleteTanker } from '../controllers/tanker.controler.js';

const router = express.Router();

// Tanker routes
router.get('/', getTankers);
router.get('/:id', getTankerById);
router.post('/', createTanker);
router.put('/:id', updateTanker);
router.delete('/:id', deleteTanker);

export default router;
