import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login } from "./pages/Login";
import { VisualizarRespostaChamado } from "./pages/VisualizarRespostaChamado";
import { CadastrarNovaResposta } from "./pages/CadastrarNovaResposta";
import { HomeAdmin } from "./pages/HomeAdmin";
import { GerenciarCategorias } from "./pages/GerenciarCategorias";
import { GerenciarUsuarios } from "./pages/GerenciarUsuarios";
import { PrivateRoute,AdminRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      
      <ToastContainer />  
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas para usuários normais */}
        <Route path="/visualizar-resposta-chamado" element={
          <PrivateRoute>
            <VisualizarRespostaChamado />
          </PrivateRoute>} />

        {/* Rotas protegidas para administradores */}
        <Route path="/home-admin" element={
          <AdminRoute>
            <HomeAdmin />
          </AdminRoute>} />
        <Route path="/cadastrar-nova-resposta" element={
          <AdminRoute>
            <CadastrarNovaResposta />
          </AdminRoute>} />
        <Route path="/gerenciar-categorias" element={
          <AdminRoute>
            <GerenciarCategorias />
          </AdminRoute>} />
        <Route path="/gerenciar-usuarios" element={
          <AdminRoute>
            <GerenciarUsuarios />
          </AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
