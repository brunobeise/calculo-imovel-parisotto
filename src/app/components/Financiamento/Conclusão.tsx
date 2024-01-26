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

export default function Conclusão() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);
 
  return (
    <div className="overflow-x-auto col-span-4 mb-10">
      <h2 className="text-xl text-center mb-2 ">Conclusão</h2>

      <div className="grid grid-rows gap-5">
        <Table className="w-full text-center" striped>
          <TableHead>
            <TableHeadCell>Compra do imóvel</TableHeadCell>
            <TableHeadCell>Investido</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow>
              <TableCell>
                {numeroParaReal(imovelData.entrada + imovelData.taxas)}
              </TableCell>
              <TableCell>
    
                {numeroParaReal(
                  imovelData.valorImovel -
                    (imovelData.entrada + imovelData.taxas)
                )}
              </TableCell>
              <TableCell>{numeroParaReal(imovelData.saldoPessoal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p className="text-md my-2 text-center">
          Resultado após {imovelData.anoFinal} anos:
        </p>

        <Table className="w-full text-center" striped>
          <TableHead>
            <TableHeadCell>Valor do imóvel</TableHeadCell>
            <TableHeadCell>Valor investido</TableHeadCell>
            <TableHeadCell>Saldo Devedor</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow>
              <TableCell>{numeroParaReal(imovelData.valorImóvelValorizado)}</TableCell>
              <TableCell>
                {numeroParaReal(imovelData.patrimonioInvestimento)}
              </TableCell>
              <TableCell>{numeroParaReal(imovelData.saldoDevedor)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="w-full text-center" striped>
          <TableHead>
            <TableHeadCell>Patrimônio Total</TableHeadCell>
            <TableHeadCell>Renda Mensal aluguel + rendimento</TableHeadCell>
            <TableHeadCell>Lucro na operação</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow>
              <TableCell className="text-black font-bold">
              {numeroParaReal( imovelData.valorImóvelValorizado + imovelData.patrimonioInvestimento - imovelData.saldoDevedor) }
              </TableCell>
              <TableCell>
                {numeroParaReal(
                  imovelData.valorAluguel[imovelData.valorAluguel.length - 1] *
                    1.08 +
                    (imovelData.patrimonioInvestimento *
                      imovelData.taxaRendimentoMensal) /
                      100
                )}
              </TableCell>
              <TableCell>
                {(
                  ((imovelData.valorImóvelValorizado +
                    imovelData.patrimonioInvestimento -
                    imovelData.saldoDevedor) /
                    imovelData.saldoPessoal) *
                  100
                ).toFixed(2) + "%"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
