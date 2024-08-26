import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { corsOptions, useSocket } from './socket';
import messagesRoutes from './routes/messages.routes';
import notificationsRoutes from './routes/notifications.routes'

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'));
app.use(cors(corsOptions))

app.use('/api/messages', messagesRoutes)
app.use('/api/notifications', notificationsRoutes)

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export const io = useSocket(httpServer);
io.on('connection', (socket) => {
  console.log('connected');
})