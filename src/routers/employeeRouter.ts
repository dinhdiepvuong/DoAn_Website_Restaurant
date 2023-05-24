import { Router } from 'express';
import { createEmployee, findAllEmployees, findEmployeeById, updateEmployee, deleteEmployee } from '../controllers';

const router = Router();

router.get('/list', findAllEmployees);
router.post('/create', createEmployee);
router.delete('/delete/:id', deleteEmployee);
router.get('/detail/:id', findEmployeeById);
router.put('/update', updateEmployee);


export = router;
