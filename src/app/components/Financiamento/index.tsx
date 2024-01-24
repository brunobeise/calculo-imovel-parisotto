import { useContext, useEffect } from "react";
import CardDadosImóvel from "./CardDadosImóvel";
import Conclusão from "./Conclusão";
import TableRendimento from "./TableRendimento";
import TableValorizaçãoAluguel from "./TableValorizaçãoAluguel";
import ImovelDataContext from "@/app/contexts/imovelData";

export default function Financiamento() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);

  // calcula a valorização do aluguel
  useEffect(() => {
    let valoresAluguelTemp: number[] = [];

    for (let ano = 1; ano <= imovelData.anoFinal; ano++) {
      let valorAluguel =
        ano === 1
          ? imovelData.valorInicialAluguel
          : Number(
              (
                imovelData.valorInicialAluguel * Math.pow(1 + 0.08, ano - 1)
              ).toFixed(2)
            );

      valoresAluguelTemp.push(valorAluguel);
    }
    setImovelData({
      ...imovelData,
      valorAluguel: valoresAluguelTemp,
    });
  }, [imovelData.anoFinal, imovelData.valorInicialAluguel]);

  return (
    <>
      <div className="grid grid-cols-12 px-10 gap-8 gap-y-5 justify-center">
        <CardDadosImóvel />
        <Conclusão />

        <TableValorizaçãoAluguel />
        <TableRendimento />
      </div>
    </>
  );
}
