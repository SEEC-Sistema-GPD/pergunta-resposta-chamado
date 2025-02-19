import { useEffect, useState } from 'react'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from './components/Accordion'
import { Header } from './components/Header'
import RespostaService from './services/RespostaService'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Categoria, Resposta } from './types/respostas.types'
import { FiltragemPorCategoria } from './components/Select'

function App() {

  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const service = new RespostaService();

  useEffect(() => {
    getRespostas();
  }, []);

  async function getRespostas() {
    await service.getRespostas()
      .then((res) => {
        setRespostas(res)
        setCategorias(res.map((resposta: Resposta) => resposta.categorias))
      });
  }

  function getRespostasByCategoria(categoria: string) {
    if (categoria === "Todas") {
      getRespostas();
    } else {
      service.getRespostasByCategoria(categoria)
        .then((res) => {
          setRespostas(res);
        });
    }
  }

  return (
    <div className='w-screen bg-[#c4d2eb77] h-screen flex flex-col  overflow-y-auto space-y-4'>
      <Header />
      <div className='flex flex-col items-center h-fit p-10 space-y-2 '>
        <FiltragemPorCategoria categorias={categorias} onChange={getRespostasByCategoria} />
        <div className='flex flex-col items-center space-y-2  mb-8'>
          {respostas?.map((duvida, index) => (
            <AccordionRoot key={index}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <div className='flex w-full justify-between gap-2'>
                    <p className='flex gap-2 items-center justify-center'>{duvida.titulo}
                      <span className='bg-[#3D4A7B] text-sm text-white px-2 py-1 rounded-md'>
                        {duvida.categorias.nome}
                      </span>
                    </p>
                    <p className='text-gray-500'>
                      {format(new Date(duvida.data_criacao),
                        'd MMMM yyyy', { locale: ptBR })}
                    </p>
                  </div>

                </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col space-y-2'>
                    <div className='flex flex-col'>
                      <p className='font-semibold'>Descrição do problema:</p>
                      <p>{duvida.descricao}</p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='font-semibold'>Causa do problema:</p>
                      <p>{duvida.causa}</p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                      <p className='font-semibold'>Resposta padrão:</p>
                      <p>{duvida.resposta}</p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                      <p className='font-semibold'>Passos para resolução:</p>
                      <p>{duvida.passos}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          ))}
        </div>
      </div>

      <div className='absolute w-screen bottom-0 bg-[#3D4A7B] text-white text-center p-3'>
        Grupo DEV - Grupo de Processamento de Dados
      </div>
    </div>
  )
}

export default App
