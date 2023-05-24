import { Router } from 'express';
import { createBookDetail, findAllBookDetails, findBookDetailById, updateBookDetail, deleteBookDetail } from '../controllers';

const router = Router();

router.get('/list', findAllBookDetails);
router.post('/create', createBookDetail);
router.delete('/delete/:id', deleteBookDetail);
router.get('/detail/:id', findBookDetailById);
router.put('/update', updateBookDetail);

export = router;
