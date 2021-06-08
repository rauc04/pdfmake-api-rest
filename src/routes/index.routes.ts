import { Router } from 'express';
import { getAcademicRecord } from '../controllers/academic-record.controller';
import { getReportCard } from '../controllers/report-card.controller';

const router = Router();

router.route('/api/pdfmake/report-card').get(getReportCard);
router.route('/api/pdfmake/academic-record').get(getAcademicRecord);
router.route('/').get((req, res) => res.send('Bienvenido a Reportes CECyTEC'));

export default router;