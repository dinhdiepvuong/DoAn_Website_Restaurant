import { Router } from 'express';
import { createFood, findAllFoods, findFoodById, updateFood, deleteFood } from '../controllers';

const router = Router();

router.get('/list', findAllFoods);
router.post('/create', createFood);
router.delete('/delete/:id', deleteFood);
router.get('/detail/:id', findFoodById);
router.put('/update', updateFood);

export = router;
