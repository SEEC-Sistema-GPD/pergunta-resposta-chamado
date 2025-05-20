import express from 'express';
import cors from 'cors';
import RespostasRoutes from './presentation/routes/RespostasRoutes.js';
import CategoriaRoutes from './presentation/routes/CategoriasRoutes.ts';
import UsuarioRoutes from './presentation/routes/UsuariosRoutes.ts';
import AuthRoutes from './presentation/routes/AuthRoutes.ts';

const app = express();

class App {
  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
    app.use(cors({
      origin: (origin, callback) => {
        // Aceita qualquer porta do localhost ou o IP do frontend
        if (!origin || origin.startsWith('http://localhost:') || origin === 'http://10.26.0.51:5058') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    }));

    // Configuração do Express
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  }

  routes() {
    app.use('/api/respostas', RespostasRoutes);
    app.use('/api/categoria', CategoriaRoutes);
    app.use('/api/usuario', UsuarioRoutes);
    app.use('/api/auth', AuthRoutes);
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
