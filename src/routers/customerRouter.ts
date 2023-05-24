import { Router } from 'express';
import { createCustomer, findAllCustomers, findCustomerById, updateCustomer, deleteCustomer } from '../controllers';

const router = Router();

router.get('/list', findAllCustomers);
router.post('/create', createCustomer);
router.delete('/delete/:id', deleteCustomer);
router.get('/detail/:id', findCustomerById);
router.put('/update', updateCustomer);
// router.post('/login', findUserByUsernameAndPassword);

export = router;
