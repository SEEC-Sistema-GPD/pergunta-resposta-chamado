import type React from "react"
import { useState, useRef } from "react"
import Swal from "sweetalert2"
import { Upload, X, File, ImageIcon, FileText } from "lucide-react"

interface Props {
    onFilesChange?: (arquivos: File[]) => void
    tamanhoMaximoMb?: number
    tiposAceitos?: string[]
    maxArquivos?: number
}

export default function AnexarArquivos({
    onFilesChange,
    tamanhoMaximoMb = 8,
    tiposAceitos = [".png", ".jpg", ".jpeg", ".pdf", ".doc", ".docx"],
    maxArquivos = 10,
}: Props) {
    const [arquivosAnexados, setArquivosAnexados] = useState<File[]>([])
    const [arrastoAtivo, setArrastoAtivo] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const lidarComArquivos = (arquivos: FileList | null) => {
        if (!arquivos) return

        if (arquivosAnexados.length >= maxArquivos) {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: `Você só pode anexar até ${maxArquivos} arquivos.`,
            })
            return
        }

        const novos = Array.from(arquivos).filter((arquivo) => {
            if (arquivo.size > tamanhoMaximoMb * 1024 * 1024) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `O arquivo ${arquivo.name} excede o limite de ${tamanhoMaximoMb}MB.`,
                })
                return false
            }

            const extensao = "." + arquivo.name.split(".").pop()?.toLowerCase()
            if (!tiposAceitos.includes(extensao)) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `O tipo de arquivo ${extensao} não é aceito.`,
                })
                return false
            }

            return true
        })

        const atualizados = [...arquivosAnexados, ...novos].slice(0, maxArquivos)
        setArquivosAnexados(atualizados)
        onFilesChange?.(atualizados)
    }

    const removerArquivo = (index: number) => {
        const atualizados = arquivosAnexados.filter((_, i) => i !== index)
        setArquivosAnexados(atualizados)
        onFilesChange?.(atualizados)
    }

    const lidarComArrasto = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setArrastoAtivo(true)
        } else if (e.type === "dragleave") {
            setArrastoAtivo(false)
        }
    }

    const lidarComDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setArrastoAtivo(false)
        lidarComArquivos(e.dataTransfer.files)
    }

    const obterIconeArquivo = (nome: string) => {
        const ext = nome.split(".").pop()?.toLowerCase()
        if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext || "")) return <ImageIcon className="w-4 h-4" />
        if (["pdf"].includes(ext || "")) return <FileText className="w-4 h-4" />
        return <File className="w-4 h-4" />
    }

    const formatarTamanho = (bytes: number) => {
        const k = 1024
        const tamanhos = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number((bytes / Math.pow(k, i)).toFixed(2)) + " " + tamanhos[i]
    }

    return (
        <div className="w-full">
            <div className="bg-white rounded-b-lg">
                <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${arrastoAtivo ? "border-[#3D4A7B] bg-blue-50" : "border-gray-300 hover:border-[#3D4A7B] hover:bg-gray-50"
                        }`}
                    onDragEnter={lidarComArrasto}
                    onDragLeave={lidarComArrasto}
                    onDragOver={lidarComArrasto}
                    onDrop={lidarComDrop}
                >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                        Arraste e solte os arquivos aqui ou{" "}
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="cursor-pointer text-[#3D4A7B] hover:underline font-medium"
                        >
                            clique para selecionar
                        </button>
                    </p>
                    <p className="text-xs text-gray-500">
                        {maxArquivos} arquivos, até {tamanhoMaximoMb}MB cada
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Formatos aceitos: {tiposAceitos.join(", ")}</p>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={tiposAceitos.join(",")}
                    onChange={(e) => lidarComArquivos(e.target.files)}
                    className="hidden"
                />

                {arquivosAnexados.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Arquivos anexados ({arquivosAnexados.length}/{maxArquivos})
                        </h4>
                        <div className="space-y-2">
                            {arquivosAnexados.map((arquivo, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex items-center space-x-3">
                                        {obterIconeArquivo(arquivo.name)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{arquivo.name}</p>
                                            <p className="text-xs text-gray-500">{formatarTamanho(arquivo.size)}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removerArquivo(index)}
                                        className="cursor-pointer p-1 text-red-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
