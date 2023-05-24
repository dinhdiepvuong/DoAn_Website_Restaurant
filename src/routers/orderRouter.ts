import { Router } from 'express';
import { createOrder, findAllOrders, findOrderById, updateOrder, deleteOrder } from '../controllers';

const router = Router();

router.get('/list', findAllOrders);
router.post('/create', createOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/detail/:id', findOrderById);
router.put('/update', updateOrder);

export = router;
