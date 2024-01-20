// ImovelDataContext.js
import { createContext } from 'react';

const ImovelDataContext = createContext<ImovelDataContextType>({
    imovelData: {} as ImovelData,
    setImovelData: () => { },
});

type ImovelData = {
    valorImovel: number;
    entrada: number;
    taxas: number;
    saldoPessoal: number
    taxaRendimentoMensal: number
    valorParcela: number
    valorInicialAluguel: number
    anoFinal: number
};

export type ImovelDataContextType = {
    imovelData: ImovelData;
    setImovelData: React.Dispatch<React.SetStateAction<ImovelData>>
};

export default ImovelDataContext;
