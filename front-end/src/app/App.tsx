import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login } from "./pages/Login";
import { VisualizarRespostaChamado } from "./pages/VisualizarRespostaChamado";
import { CadastrarNovaResposta } from "./pages/CadastrarNovaResposta";
import { HomeAdmin } from "./pages/HomeAdmin";
import { GerenciarCategorias } from "./pages/GerenciarCategorias";
import { GerenciarUsuarios } from "./pages/GerenciarUsuarios";
import { GerenciarRamais } from "./pages/GerenciarRamais";
import { AcessoNegado } from "./pages/AcessoNegado";

import {
  PrivateRoute,
  AdminRestritoRoute,
  AdminMasterRoute
} from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/visualizar-resposta-chamado" element={
          <PrivateRoute>
            <VisualizarRespostaChamado />
          </PrivateRoute>
        } />

        <Route path="/home-admin" element={
          <AdminRestritoRoute>
            <HomeAdmin />
          </AdminRestritoRoute>
        } />
        <Route path="/cadastrar-nova-resposta" element={
          <AdminRestritoRoute>
            <CadastrarNovaResposta />
          </AdminRestritoRoute>
        } />

        <Route path="/gerenciar-categorias" element={
          <AdminMasterRoute>
            <GerenciarCategorias />
          </AdminMasterRoute>
        } />
        <Route path="/gerenciar-usuarios" element={
          <AdminMasterRoute>
            <GerenciarUsuarios />
          </AdminMasterRoute>
        } />

        <Route path="/acesso-negado" element={<AcessoNegado />} />

        <Route path="/gerenciar-ramais" element={
          <PrivateRoute>
            <GerenciarRamais />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
