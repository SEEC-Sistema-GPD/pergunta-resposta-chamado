import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaLock } from "react-icons/fa";

export function AcessoNegado() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-[#c4d2eb77]">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
        <FaLock className="text-6xl text-[#3D4A7B] mb-4" />
        <h1 className="text-3xl font-bold text-[#3D4A7B] mb-2">
          Acesso Negado
        </h1>
        <p className="text-gray-700 mb-6 max-w-md">
          Você não tem permissão para acessar esta página. Por favor, retorne à
          página inicial ou entre em contato com o suporte.
        </p>
      </div>

      <Footer />
    </div>
  );
}
