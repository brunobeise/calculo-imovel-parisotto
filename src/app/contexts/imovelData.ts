// ImovelDataContext.js
import { createContext } from 'react';

const ImovelDataContext = createContext<ImovelDataContextType>({
    imovelData: {} as ImovelData,
    setImovelData: () => { },
});

export type ImovelData = {
    valorImovel: number;
    entrada: number;
    taxas: number;
    saldoPessoal: number
    taxaRendimentoMensal: number
    valorParcela: number
    valorInicialAluguel: number
    anoFinal: number
    valorAluguel: number[]
    patrimonioInvestimento: number
    valorizaçãoDoImovel: number
    valorImóvelValorizado: number
    saldoDevedor: number
};

export type ImovelDataContextType = {
    imovelData: ImovelData;
    setImovelData: React.Dispatch<React.SetStateAction<ImovelData>>
};

export default ImovelDataContext;
