import { Router } from 'express';
import { getAcademicRecord } from '../controllers/academic-record.controller';
import { getPaymentDocument } from '../controllers/payment.controller';
import { getManyReportCard, getReportCard } from '../controllers/report-card.controller';

const router = Router();

router.route('/rpt/report-card').post(getReportCard);
router.route('/rpt/many-report-card').post(getManyReportCard);
router.route('/rpt/academic-record').post(getAcademicRecord);
router.route('/rpt/payment-document').post(getPaymentDocument);
// router.route('/rpt/payment-document2/:reference/:type').get(getPaymentDocument);
router.route('/rpt/welcome').get((req, res) => res.send('Bienvenido a Reportes CECyTEC'));

export default router;