import { Router } from 'express';
import { getAcademicRecord } from '../controllers/academic-record.controller';
import { getReportCard } from '../controllers/report-card.controller';

const router = Router();

router.route('/api/pdfmake/report-card').get(getReportCard);
router.route('/api/pdfmake/academic-record').get(getAcademicRecord);

export default router;