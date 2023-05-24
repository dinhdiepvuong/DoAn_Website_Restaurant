import { Router } from 'express';
import { createBook, findAllBooks, findBookById, updateBook, deleteBook, findFoodsAndTablesByBook, updateFoodInBook, findTablesForBook, findAllBooksForOrder } from '../controllers';

const router = Router();

router.get('/list', findAllBooks);
router.post('/create', createBook);
router.delete('/delete/:id', deleteBook);
router.get('/detail/:id', findBookById);
router.put('/update', updateBook);
router.get('/find-foods-and-tables-by-book/:bookId', findFoodsAndTablesByBook);
router.post('/update-food-in-book', updateFoodInBook);
router.post('/find-tables-for-book', findTablesForBook);
router.get('/find-all-books-for-order', findAllBooksForOrder);

export = router;
