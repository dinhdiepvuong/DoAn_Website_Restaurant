import { Router } from 'express';
import { createArea, findAllAreas, findAreaById, updateArea, deleteArea } from '../controllers';

const router = Router();

router.get('/list', findAllAreas);
router.post('/create', createArea);
router.delete('/delete/:id', deleteArea);
router.get('/detail/:id', findAreaById);
router.put('/update', updateArea);

export = router;
