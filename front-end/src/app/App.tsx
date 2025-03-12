import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { VisualizarRespostaChamado } from "./pages/VisualizarRespostaChamado";
import { CadastrarNovaResposta } from "./pages/CadastrarNovaResposta";
import { HomeAdmin } from "./pages/HomeAdmin";
import { GerenciarCategorias } from "./pages/GerenciarCategorias";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/visualizar-resposta-chamado" element={<VisualizarRespostaChamado />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/cadastrar-nova-resposta" element={<CadastrarNovaResposta />} />
        <Route path="/gerenciar-categorias" element={<GerenciarCategorias />} />
      </Routes>
    </Router>
  );
}

export default App;
