import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { TbLogout, TbArrowBackUp } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const nomeUsuario = localStorage.getItem("displayName")?.split(" ")[0] || "";
  const perfil = localStorage.getItem("perfil"); // 'C', 'R' ou 'M'
  const rotaAtual = location.pathname;

  const deveExibirBotaoVoltar = () => {
    if ((perfil === 'M' || perfil === 'R') && rotaAtual === "/home-admin") return false;
    if (perfil === 'C' && rotaAtual === "/visualizar-resposta-chamado") return false;
    return true;
  };

  function handleLogout() {
    Swal.fire({
      title: `Deseja encerrar sua sessão${nomeUsuario ? `, ${nomeUsuario}` : ""}?`,
      text: "Você será redirecionado para a página inicial!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Desconectar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("displayName");
        localStorage.removeItem("userId");
        localStorage.removeItem("perfil");

        Swal.fire({
          title: "Desconectando...",
          text: "Aguarde enquanto você é redirecionado.",
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          willClose: () => {
            navigate("/");
          },
        });
      }
    });
  }

  function handleBack() {
    const perfil = localStorage.getItem("perfil");

    if (rotaAtual === "/acesso-negado") {
      if (perfil === "C") {
        navigate("/visualizar-resposta-chamado");
      } else {
        navigate("/home-admin");
      }
    } else {
      navigate(-1);
    }
  }

  return (
    <header className="w-full bg-[#3D4A7B] text-white flex flex-col">
      <div className="flex justify-between items-center p-2 border-b-4 border-[#D99C44]">
        {deveExibirBotaoVoltar() ? (
          <button
            onClick={handleBack}
            className="cursor-pointer text-white font-bold rounded ml-2 text-2xl"
            data-tooltip-id="voltar"
          >
            <TbArrowBackUp />
          </button>
        ) : (
          <div className="w-[32px]" />
        )}

        <h1 className="text-lg font-medium text-center flex-1">
          SIGEduc <span className="font-normal opacity-80 text-sm">- Sistema Integrado de Gestão da Educação</span>
        </h1>

        <button
          onClick={handleLogout}
          className="cursor-pointer text-white font-bold rounded mr-2 text-2xl"
          data-tooltip-id="desconectar"
        >
          <TbLogout />
        </button>

        <Tooltip id="voltar" place="right" content="Voltar" />
        <Tooltip id="desconectar" place="left" content="Desconectar" />
      </div>

      <div className="p-2 bg-[#C4D2EB] flex-1 text-center items-center">
        <p className="text-primary">
          FAQ - Suporte SEEC/RN
        </p>
      </div>
    </header>
  );
};
