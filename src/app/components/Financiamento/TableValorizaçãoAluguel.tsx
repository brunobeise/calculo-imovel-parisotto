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
import { ReactNode, useEffect, useState } from "react";
import { useContext } from "react";

export default function TableValorizaçãoAluguel() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);
  const [rows, setRows] = useState<
    {
      valorAluguel: string;
      arrecadacaoAnual: string;
      ano: number;
    }[]
  >([]);

  useEffect(() => {
    const newRows = imovelData.valorAluguel.map((valorAluguel, index) => {
      const arrecadacaoAnual = valorAluguel * 12;
      return {
        valorAluguel: numeroParaReal(valorAluguel),
        arrecadacaoAnual: numeroParaReal(arrecadacaoAnual),
        ano: index + 1,
      };
    });

    setRows(newRows);
  }, [
    imovelData.anoFinal,
    imovelData.valorInicialAluguel,
    imovelData.valorAluguel,
  ]);

  return (
    <div className="overflow-x-auto col-span-4 max-h-[425px]">
      <h2 className="text-xl text-center ">Valorização Aluguel</h2>
      <p className="text-xs mb-5 text-center">(inflação 8% ao ano)</p>
      <Table className="w-full" striped>
        <TableHead>
          <TableHeadCell>Ano</TableHeadCell>
          <TableHeadCell>Valor do Aluguel</TableHeadCell>
          <TableHeadCell>Arrecadação Anual</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {rows?.map((item) => (
            <TableRow
              key={item.ano}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 "
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.ano}
              </TableCell>
              <TableCell>{item.valorAluguel}</TableCell>
              <TableCell>{item.arrecadacaoAnual}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
