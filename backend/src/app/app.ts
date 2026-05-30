import express from 'express';
import userRoutes from '../routes/user_routes';
import { errMiddleware } from '../middleware/error_middleware';


const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errMiddleware);

export default app;