import { Router } from 'express';
import { loginAdmin } from '../controllers';

const router = Router();


router.post('/login-admin', loginAdmin);


export default router;
