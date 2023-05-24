import { Router } from 'express';
import { createProductType, findAllProductTypes, findProductTypeById, updateProductType, deleteProductType } from '../controllers';

const router = Router();

router.get('/list', findAllProductTypes);
router.post('/create', createProductType);
router.delete('/delete/:id', deleteProductType);
router.get('/detail/:id', findProductTypeById);
router.put('/update', updateProductType);

export = router;
