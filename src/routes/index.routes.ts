import { Router } from 'express';
import { getReportCard } from '../controllers/report-card.controller';

const router = Router();

router.route('/api/report-card').get(getReportCard);

export default router;