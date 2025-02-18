import { useState } from 'react'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from './components/Accordion'
import { Header } from './components/Header'
import { duvidas } from './assets/mocks'
import { ChevronDown } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen bg-[#c4d2eb77] h-screen flex flex-col space-y-4'>

      <Header />

      <div className='flex justify-center  flex-col items-center p-10 space-y-2'>

        {duvidas.map((duvida, index) => (
          <AccordionRoot key={index}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{duvida.titulo} </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col space-y-2'>
                  <div className='flex flex-col'>
                    <p className='font-semibold'>Descrição do problema:</p>
                    <p>{duvida.descricao_problema}</p>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <p className='font-semibold'>Resposta padrão:</p>
                    <p>{duvida.resposta_padrao}</p>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <p className='font-semibold'>Passos para resolução:</p>
                    <p>{duvida.passos_resolucao}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        ))}
      </div>


      <div className='absolute w-screen bottom-0 bg-[#3D4A7B] text-white text-center p-3'>
        Grupo DEV - Grupo de Processamento de Dados
      </div>
    </div>
  )
}

export default App
