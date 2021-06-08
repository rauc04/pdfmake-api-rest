import { Router } from 'express';
import { getAcademicRecord } from '../controllers/academic-record.controller';
import { getReportCard } from '../controllers/report-card.controller';

const router = Router();

router.route('/api/reports/report-card').post(getReportCard);
router.route('/api/reports/academic-record').post(getAcademicRecord);
router.route('/').get((req, res) => res.send('Bienvenido a Reportes CECyTEC'));

export default router;