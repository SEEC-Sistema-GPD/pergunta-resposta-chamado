import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login } from "./pages/Login";
import { VisualizarRespostaChamado } from "./pages/VisualizarRespostaChamado";
import { CadastrarNovaResposta } from "./pages/CadastrarNovaResposta";
import { HomeAdmin } from "./pages/HomeAdmin";
import { GerenciarCategorias } from "./pages/GerenciarCategorias";
import { GerenciarUsuarios } from "./pages/GerenciarUsuarios";
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
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

        {/* Acesso para qualquer usuário logado */}
        <Route path="/visualizar-resposta-chamado" element={
          <PrivateRoute>
            <VisualizarRespostaChamado />
          </PrivateRoute>
        } />

        {/* Acesso para administradores restritos e master */}
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

        {/* Acesso exclusivo para administradores master */}
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

        {/* Página de acesso negado */}
        <Route path="/acesso-negado" element={<AcessoNegado />} />
      </Routes>
    </Router>
  );
}

export default App;
