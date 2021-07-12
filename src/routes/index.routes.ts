import { Router } from 'express';
import { getAcademicRecord } from '../controllers/academic-record.controller';
import { getPaymentDocument } from '../controllers/payment.controller';
import { getReportCard } from '../controllers/report-card.controller';

const router = Router();

router.route('/reports-formats/report-card').post(getReportCard);
router.route('/reports-formats/academic-record').post(getAcademicRecord);
router.route('/reports-formats/payment-document').post(getPaymentDocument);
router.route('/').get((req, res) => res.send('Bienvenido a Reportes CECyTEC'));

export default router;