import { Router } from 'express';
import { createAdmin, findAdminById, updateAdmin, deleteAdmin } from '../controllers';

const router = Router();

router.post('/create', createAdmin);
router.delete('/delete/:id', deleteAdmin);
router.get('/detail/:id', findAdminById);
router.put('/update', updateAdmin);

export = router;
