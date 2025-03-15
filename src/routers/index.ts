import { Request, Response, Router } from 'express';
import { login, register } from '../controllers/account.controller';
import { authorize } from '../middlewares /auth.middleware';
import { getBooksAsync } from '../controllers/books.controller';



const router = Router();


// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});


// account routes
router.post('/register', register);
router.post('/login', login);

// books routes
router.get('/books', authorize, getBooksAsync);
router.get('/books/:id', authorize, getBooksAsync);
router.post('/books', authorize, getBooksAsync);
router.put('/books/:id', authorize, getBooksAsync);
router.delete('/books/:id', authorize, getBooksAsync);


export default router;