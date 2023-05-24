import { Router } from 'express';
import { createTable, findAllTables, findTableById, updateTable, deleteTable, createMultiTable } from '../controllers';

const router = Router();

router.get('/list', findAllTables);
router.post('/create', createTable);
router.delete('/delete/:id', deleteTable);
router.get('/detail/:id', findTableById);
router.put('/update', updateTable);
router.post('/createMulti', createMultiTable);

export = router;
