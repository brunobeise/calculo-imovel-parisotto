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
import { useContext, useEffect, useState } from "react";

export default function TableRendimento() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);

  const [rows, setRows] = useState<
    {
      lucroMensal: string;
      capital: string;
      valorFinal: string;
      mes: number;
      montanteAluguel: string;
    }[]
  >([]);

  useEffect(() => {
    const rows: {
      lucroMensal: string;
      capital: string;
      valorFinal: string;
      mes: number;
      montanteAluguel: string;
    }[] = [];

    let capitalAcumulado =
      imovelData.saldoPessoal - imovelData.taxas - imovelData.entrada;
    let patrimonioFinal = 0;
    let valorAluguel = imovelData.valorInicialAluguel;

    for (let mes = 1; mes <= imovelData.anoFinal * 12; mes++) {
      let indiceAno = Math.floor((mes - 1) / 12);

      if (mes % 12 === 1 || mes === 1) {
        valorAluguel = imovelData.valorAluguel![indiceAno];
      }

      const montanteAluguel = Number(
        (valorAluguel - imovelData.valorParcela).toFixed(2)
      );

      const lucroMensal = Number(
        ((capitalAcumulado * imovelData.taxaRendimentoMensal) / 100).toFixed(2)
      );

      const valorFinal = Number(
        (capitalAcumulado + lucroMensal + montanteAluguel).toFixed(2)
      );

      if (mes === imovelData.anoFinal * 12) patrimonioFinal = valorFinal;

      if (mes === 73) {
        console.log({
          mes,
          capital: numeroParaReal(capitalAcumulado),
          lucroMensal: numeroParaReal(lucroMensal),
          montanteAluguel: numeroParaReal(montanteAluguel),
          valorFinal: numeroParaReal(valorFinal),
        });
      }

      rows.push({
        mes,
        capital: numeroParaReal(capitalAcumulado),
        lucroMensal: numeroParaReal(lucroMensal),
        montanteAluguel: numeroParaReal(montanteAluguel),
        valorFinal: numeroParaReal(valorFinal),
      });

      capitalAcumulado = valorFinal;
    }

    setImovelData({
      ...imovelData,
      patrimonioInvestimento: patrimonioFinal,
    });

    setRows(rows);
  }, [
    imovelData.saldoPessoal,
    imovelData.taxas,
    imovelData.entrada,
    imovelData.valorParcela,
    imovelData.valorAluguel,
    imovelData.taxaRendimentoMensal,
    imovelData.anoFinal,
  ]);

  return (
    <div className="overflow-x-auto col-span-4 ">
      <h2 className="text-xl text-center ">Investimento</h2>
      <p className="text-xs mb-5 text-center">
        rendimento {imovelData.taxaRendimentoMensal}% ao mês{" "}
      </p>
      <Table striped className="!max-h-[425px]">
        <TableHead>
          <TableHeadCell className="max-w-[15px]">Mês</TableHeadCell>
          <TableHeadCell>Capital</TableHeadCell>
          <TableHeadCell>Rendimento</TableHeadCell>
          <TableHeadCell>Aluguel</TableHeadCell>
          <TableHeadCell>Valor FInal</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {rows.map((item) => (
            <TableRow key={item.mes}>
              <TableCell className="max-w-[15px]">{item.mes}</TableCell>
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
