import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TbLogout } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const Header = () => {
    const navigate = useNavigate();

    function handleLogout() {
        Swal.fire({
            title: "Deseja encerrar sua sessão?",
            text: "Você será redirecionado para a página inicial.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Desconectar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");

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
                    }
                });
            }
        });
    }

    return (
        <header className="w-full bg-[#3D4A7B] text-white flex flex-col">
            <div className="flex justify-between items-center p-2 border-b-4 border-[#D99C44]">
                <h1 className="text-lg font-medium">
                    SEEC - SIGEduc - Sistema Integrado de Gestão da Educação
                </h1>
                <button
                    onClick={handleLogout}
                    className="cursor-pointer text-white font-bold rounded mr-2 text-2xl"
                    data-tooltip-id="desconectar"
                >
                    <TbLogout />
                </button>
                <Tooltip id="desconectar" place="left" content="Desconectar" />
            </div>

            <div className="p-2 bg-[#C4D2EB] flex items-center">
                <p className="text-primary">
                    Perguntas Frequentes para a Equipe de Suporte da SEEC - SIGEduc
                </p>
            </div>
        </header>
    );
};
