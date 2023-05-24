import { Router } from 'express';
import { createDrink, findAllDrinks, findDrinkById, updateDrink, deleteDrink } from '../controllers';

const router = Router();

router.get('/list', findAllDrinks);
router.post('/create', createDrink);
router.delete('/delete/:id', deleteDrink);
router.get('/detail/:id', findDrinkById);
router.put('/update', updateDrink);

export = router;
