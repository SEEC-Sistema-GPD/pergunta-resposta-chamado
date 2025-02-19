import express from 'express';
import cors from 'cors';
import RespostasRoutes from './presentation/routes/RespostasRoutes.js';

const app = express();

class App {
  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
    app.use(cors({
      origin: ['http://localhost:5173'],
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  }

  routes() {
    console.log('Routes');
    app.use('/api/respostas', RespostasRoutes);
  }


  listen() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  }
}

const server = new App();
server.listen();

export { server };
export default app;
