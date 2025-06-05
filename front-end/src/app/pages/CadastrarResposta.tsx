import type React from "react"

import { useState, useEffect, useRef } from "react"
import Swal from "sweetalert2"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useNavigate } from "react-router-dom"
import AnexarArquivos from "../components/AnexarArquivos"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export function CadastrarResposta() {
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        causa: "",
        categoria_id: "",
        resposta: "",
        passos: "",
    })

    const [arquivos, setArquivos] = useState<File[]>([])
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([])
    const descricaoRef = useRef<HTMLTextAreaElement | null>(null)
    const causaRef = useRef<HTMLTextAreaElement | null>(null)
    const respostaRef = useRef<HTMLTextAreaElement | null>(null)
    const passosRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await fetch(`${backendUrl}/api/categoria`)
                const data = await response.json()
                setCategorias(data)
            } catch (error) {
                console.error("Erro ao buscar categorias:", error)
            }
        }
        fetchCategorias()
    }, [])

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "categoria_id" ? Number(value) : value,
        }))
    }

    function autoResizeTextarea(el: HTMLTextAreaElement | null) {
        if (el) {
            el.style.height = "auto"
            el.style.height = `${el.scrollHeight}px`
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const confirmResult = await Swal.fire({
            title: "Tem certeza disso?",
            text: "Você cadastrará uma nova resposta.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cadastrar",
            cancelButtonText: "Cancelar",
        })

        if (!confirmResult.isConfirmed) return

        const dataToSend = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            dataToSend.append(key, String(value))
        })
        arquivos.forEach((file) => {
            dataToSend.append("anexos", file)
        })

        try {
            const response = await fetch(`${backendUrl}/api/respostas`, {
                method: "POST",
                body: dataToSend,
            })

            if (response.ok) {
                await Swal.fire("Sucesso!", "Resposta cadastrada com sucesso!", "success")

                setFormData({
                    titulo: "",
                    descricao: "",
                    causa: "",
                    categoria_id: "",
                    resposta: "",
                    passos: "",
                })
                setArquivos([])
                    ;[descricaoRef, causaRef, respostaRef, passosRef].forEach((ref) => {
                        if (ref.current) {
                            ref.current.style.height = "auto"
                        }
                    })

                await Swal.fire({
                    title: "Teleportando...",
                    text: "Aguarde enquanto você é redirecionado.",
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    willClose: () => {
                        navigate("/visualizar-resposta-chamado")
                    },
                })
            } else {
                throw new Error("Erro ao cadastrar resposta")
            }
        } catch (error) {
            console.error("Erro ao cadastrar resposta:", error)
            Swal.fire("Erro!", "Ocorreu um erro ao cadastrar a resposta.", "error")
        }
    }

    return (
        <div className="min-h-screen w-screen bg-[#c4d2eb77] flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-4 flex items-center justify-center">
                <div className="w-full max-w-4xl">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">
                        <h1 className="bg-[#3D4A7B] text-white rounded-t-lg">Cadastrar Resposta</h1>
                    </div>

                    <div className="bg-white shadow-lg rounded-b-lg p-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="titulo"
                                    placeholder="Título da resposta"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D4A7B] focus:border-transparent text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <select
                                    name="categoria_id"
                                    value={formData.categoria_id}
                                    onChange={handleChange}
                                    className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D4A7B] focus:border-transparent text-sm ${formData.categoria_id ? "text-black" : "text-gray-500"}`}
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Selecione uma categoria
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <textarea
                                    ref={descricaoRef}
                                    name="descricao"
                                    placeholder="Informe a descrição do problema"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                    rows={2}
                                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3D4A7B] focus:border-transparent text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    ref={causaRef}
                                    name="causa"
                                    placeholder="Informe a causa do problema"
                                    value={formData.causa}
                                    onChange={handleChange}
                                    onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                    rows={2}
                                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3D4A7B] focus:border-transparent text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    ref={passosRef}
                                    name="passos"
                                    placeholder="Passos para resolução"
                                    value={formData.passos}
                                    onChange={handleChange}
                                    onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                    rows={2}
                                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3D4A7B] focus:border-transparent text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    ref={respostaRef}
                                    name="resposta"
                                    placeholder="Informe a resposta padrão"
                                    value={formData.resposta}
                                    onChange={handleChange}
                                    onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                    rows={2}
                                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3D4A7B] focus:border-transparent text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <AnexarArquivos onFilesChange={setArquivos} />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-[#3D4A7B] text-white py-2 px-4 rounded-lg hover:bg-[#2C3A60] focus:outline-none focus:ring-2 focus:ring-[#3D4A7B] focus:ring-offset-2 font-medium text-sm"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
