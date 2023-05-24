import { Router } from 'express';
import { getCustomerByBook, getCustomerByTime, getDashboard, getRevenueByTime } from '../controllers';

const router = Router();

router.get('/dashboard', getDashboard);
router.post('/dashboard/revenue', getRevenueByTime);
router.post('/dashboard/customer', getCustomerByTime);
router.post('/dashboard/customer-book', getCustomerByBook);

export = router;
