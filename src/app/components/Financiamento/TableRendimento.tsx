import ImovelDataContext from "@/app/contexts/imovelData";
import { numeroParaReal } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useContext } from "react";

export default function TableRendimento() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);

  const rows: {
    lucroMensal: string;
    capital: string;
    valorFinal: string;
    mes: number;
    montanteAluguel: string;
  }[] = [];

  let valorAluguel = imovelData.valorInicialAluguel;
  let capitalAcumulado =
    imovelData.valorImovel - imovelData.taxas - imovelData.entrada;

  for (let mes = 1; mes <= imovelData.anoFinal * 12; mes++) {
    // Reajustar o valor do aluguel anualmente
    if (mes % 12 === 1 && mes !== 1) {
      valorAluguel *= Math.pow(1 + 0.08, Math.floor((mes - 1) / 12));
    }

    // Calcular o montante líquido recebido do aluguel após o pagamento da parcela
    const montanteAluguel = valorAluguel - imovelData.valorParcela;

    // Calcular o lucro mensal com base no capital acumulado
    const lucroMensal =
      (capitalAcumulado * imovelData.taxaRendimentoMensal) / 100;

    // Calcular o valor final (capital + lucro mensal + montante do aluguel)
    const valorFinal = capitalAcumulado + lucroMensal + montanteAluguel;

    // Preparar os dados para a tabela
    rows.push({
      mes,
      capital: numeroParaReal(capitalAcumulado),
      lucroMensal: numeroParaReal(lucroMensal),
      montanteAluguel: numeroParaReal(montanteAluguel),
      valorFinal: numeroParaReal(valorFinal),
    });

    capitalAcumulado = valorFinal;
  }

  return (
    <div className="overflow-x-auto col-span-6">
      <h2 className="text-xl text-center ">Investimento</h2>
      <p className="text-xs mb-5 text-center">
        rendimento {imovelData.taxaRendimentoMensal}% ao mês{" "}
      </p>
      <Table className="w-full text-xs" striped>
        <TableHead>
          <TableHeadCell>Mês</TableHeadCell>
          <TableHeadCell>Capital</TableHeadCell>
          <TableHeadCell>Rendimento</TableHeadCell>
          <TableHeadCell>Aluguel</TableHeadCell>
          <TableHeadCell>Valor FInal</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {rows.map((item) => (
            <TableRow className="bg-white dark:border-gray-700">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
                {item.mes}
              </TableCell>
              <TableCell>{item.capital}</TableCell>
              <TableCell>{item.lucroMensal}</TableCell>
              <TableCell>{item.montanteAluguel}</TableCell>
              <TableCell>{item.valorFinal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
