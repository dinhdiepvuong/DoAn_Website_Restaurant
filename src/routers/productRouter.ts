import { Router } from 'express';
import { createProduct, findAllProducts, findProductById, updateProduct, deleteProduct } from '../controllers';

const router = Router();

router.get('/list', findAllProducts);
router.post('/create', createProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/detail/:id', findProductById);
router.put('/update', updateProduct);

export = router;
