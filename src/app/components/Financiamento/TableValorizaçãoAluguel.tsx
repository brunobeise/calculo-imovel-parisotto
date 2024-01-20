import ImovelDataContext from "@/app/contexts/imovelData";
import { formatterReal, numeroParaReal } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ReactNode } from "react";
import { useContext } from "react";

export default function TableValorizaçãoAluguel() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);

  const rows: {
    valorAluguel: string;
    arrecadacaoAnual: string;
    ano: number;
  }[] = [];
  for (let ano = 1; ano <= imovelData.anoFinal; ano++) {
    let valorAluguel;
    if (ano === 1) {
      valorAluguel = imovelData.valorInicialAluguel;
    } else {
      valorAluguel =
        imovelData.valorInicialAluguel * Math.pow(1 + 0.08, ano - 1);
    }

    const arrecadacaoAnual = valorAluguel * 12;

    rows.push({
      valorAluguel: numeroParaReal(valorAluguel),
      arrecadacaoAnual: numeroParaReal(arrecadacaoAnual),
      ano,
    });
  }

  return (
    <div className="overflow-x-auto col-span-6">
      <h2 className="text-xl text-center ">Valorização Aluguel</h2>
      <p className="text-xs mb-5 text-center">(inflação 8% ao ano)</p>
      <Table className="w-full" striped>
        <TableHead>
          <TableHeadCell>Ano</TableHeadCell>
          <TableHeadCell>Valor do Aluguel</TableHeadCell>
          <TableHeadCell>Arrecadação Anual</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {rows.map((item) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.ano}
              </TableCell>
              <TableCell>{item.valorAluguel}</TableCell>
              <TableCell>{item.arrecadacaoAnual}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
