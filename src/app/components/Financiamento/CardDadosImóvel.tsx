import { formatterReal, realParaNumero } from "@/utils";
import { Card, Label, Select, TextInput } from "flowbite-react";
import { useState, useContext, useEffect } from "react";
import ImovelDataContext from "../../contexts/imovelData";
import { InputCounter } from "flowbite";

export default function CardDadosImóvel() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);
  const [valorImovel, setValorImovel] = useState(
    formatterReal(imovelData.valorImovel * 100)
  );
  const [entrada, setEntrada] = useState(
    formatterReal(imovelData.entrada * 100)
  );
  const [taxas, setTaxas] = useState(formatterReal(imovelData.taxas * 100));
  const [saldoPessoal, setSaldoPessoal] = useState(
    formatterReal(imovelData.saldoPessoal * 100)
  );
  const [valorParcela, setValorParcela] = useState(
    formatterReal(imovelData.valorParcela * 100)
  );
  const [valorInicialALuguel, setValorInicialALuguel] = useState(
    formatterReal(imovelData.valorInicialAluguel * 100)
  );

  const handleChangeReal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    const id = event.target.id;
    const valorFormatado = formatterReal(valor);
    setImovelData({
      ...imovelData,
      [id]: realParaNumero(valorFormatado),
    });
    if (id === "valorImovel") setValorImovel(valorFormatado);
    if (id === "entrada") setEntrada(valorFormatado);
    if (id === "taxas") setTaxas(valorFormatado);
    if (id === "saldoPessoal") setSaldoPessoal(valorFormatado);
    if (id === "valorParcela") setValorParcela(valorFormatado);
    if (id === "valorInicialAluguel") setValorInicialALuguel(valorFormatado);
  };

  const formStyle = {
    input:
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    label: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    labelSLider(value: number) {
      return `text-sm text-gray-500 dark:text-gray-400 absolute start-${value} -bottom-6`;
    },
  };

  useEffect(() => {
    const valorFinanciado = imovelData.valorImovel - imovelData.entrada;
    const parcela = Number((valorFinanciado * 0.005396).toFixed(2));

    setValorParcela(formatterReal(parcela.toFixed(2)));
    setImovelData({
      ...imovelData,
      valorParcela: parcela,
    });
  }, [imovelData.valorImovel, imovelData.entrada]);

  return (
    <>
      <Card className="col-span-12">
        <form className="grid grid-cols-12 gap-8 gap-y-0">
          <div className="col-span-4">
            <label htmlFor="valorImovel" className={formStyle.label}>
              Saldo Disponível:
            </label>
            <input
              onChange={handleChangeReal}
              type="text"
              id="saldoPessoal"
              className={formStyle.input}
              value={saldoPessoal}
              required
            />
          </div>
          <div className="col-span-4">
            <label htmlFor="valorImovel" className={formStyle.label}>
              Valor do imóvel:
            </label>
            <input
              onChange={handleChangeReal}
              type="text"
              id="valorImovel"
              className={formStyle.input}
              value={valorImovel}
              required
            />
          </div>
          <div className="relative col-span-4">
            <label htmlFor="valorImovel" className={formStyle.label}>
              Valor da entrada:
            </label>
            <input
              onChange={handleChangeReal}
              type="text"
              id="entrada"
              className={formStyle.input}
              value={entrada}
              required
            />
            <span className="text-sm absolute top-[2.5rem] right-[1rem]">
              {((imovelData.entrada / imovelData.valorImovel) * 100).toFixed(
                2
              ) + "%"}
            </span>
            <div className="relative mb-6">
              <input
                onChange={(e) => {
                  setImovelData({
                    ...imovelData,
                    entrada:
                      (imovelData.valorImovel * Number(e.target.value)) / 10,
                  });
                  setEntrada(
                    formatterReal(
                      (imovelData.valorImovel * 100 * Number(e.target.value)) /
                        10
                    )
                  );
                }}
                id="labels-range-input"
                type="range"
                defaultValue={5}
                min="0"
                max="10"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />

              <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-0 -bottom-3">
                0%
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-[95%] -bottom-3">
                100%
              </span>
            </div>
          </div>
          <div className="col-span-4">
            <label htmlFor="valorImovel" className={formStyle.label}>
              Valor Parcela:
            </label>
            <input
              onChange={handleChangeReal}
              type="text"
              id="valorParcela"
              className={formStyle.input}
              value={valorParcela}
              required
            />
          </div>
          <div className="col-span-4">
            <label htmlFor="valorImovel" className={formStyle.label}>
              Valor Inicial Aluguel:
            </label>
            <input
              onChange={handleChangeReal}
              type="text"
              id="valorInicialAluguel"
              className={formStyle.input}
              value={valorInicialALuguel}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 col-span-4">
            <div>
              <label htmlFor="taxas" className={formStyle.label}>
                Taxas:
              </label>
              <input
                onChange={handleChangeReal}
                type="text"
                id="taxas"
                className={formStyle.input}
                value={taxas}
                required
              />
            </div>
            <div>
              <label
                htmlFor="taxas"
                className={formStyle.label + " text-[12px]"}
              >
                % Rendimento /mês:
              </label>
              <input
                onChange={(e) => {
                  setImovelData({
                    ...imovelData,
                    taxaRendimentoMensal: Number(e.target.value),
                  });
                }}
                type="number"
                id="taxas"
                className={formStyle.input}
                value={imovelData.taxaRendimentoMensal}
                required
              />
            </div>
          </div>
        </form>
      </Card>
      <div className="flex col-span-12 justify-center">
        <div className="flex gap-2 items-center">
          <div>
            <p className="text-md">Calcular</p>
          </div>
          <TextInput
            onChange={(e) => {
              if (Number(e.target.value) > 0)
                setImovelData({
                  ...imovelData,
                  anoFinal: Number(e.target.value),
                });
            }}
            className="w-[55px]"
            type="number"
            value={imovelData.anoFinal}
          />
          <div>
            <p className="text-md">anos</p>
          </div>
        </div>
      </div>
    </>
  );
}
