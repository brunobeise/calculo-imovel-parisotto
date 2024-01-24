import { formatterReal, numeroParaReal, realParaNumero } from "@/utils";
import { Card, Label, RangeSlider, Select, TextInput } from "flowbite-react";
import { useState, useContext, useEffect } from "react";
import ImovelDataContext from "../../contexts/imovelData";
import { InputCounter } from "flowbite";

export default function CardDadosImóvel() {
  const { imovelData, setImovelData } = useContext(ImovelDataContext);
  const [valorImovel, setValorImovel] = useState(
    numeroParaReal(imovelData.valorImovel)
  );
  const [entrada, setEntrada] = useState(numeroParaReal(imovelData.entrada));
  const [taxas, setTaxas] = useState(numeroParaReal(imovelData.taxas));
  const [saldoPessoal, setSaldoPessoal] = useState(
    numeroParaReal(imovelData.saldoPessoal)
  );
  const [valorParcela, setValorParcela] = useState(
    numeroParaReal(imovelData.valorParcela)
  );
  const [valorInicialALuguel, setValorInicialALuguel] = useState(
    numeroParaReal(imovelData.valorInicialAluguel)
  );

  const [saldoDevedor, setSaldoDevedor] = useState(
    numeroParaReal(imovelData.saldoDevedor)
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
    if (id === "saldoDevedor") setSaldoDevedor(valorFormatado);
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
        <form className="grid grid-cols-3 gap-8">
          <div className="grid grid-flow-row gap-6">
            <div>
              <Label htmlFor="valorImovel">Saldo Disponível:</Label>
              <TextInput
                onChange={handleChangeReal}
                type="text"
                id="saldoPessoal"
                value={saldoPessoal}
                required
              />
            </div>

            <div>
              <Label htmlFor="valorImovel">Valor do imóvel:</Label>
              <TextInput
                onChange={handleChangeReal}
                type="text"
                id="valorImovel"
                value={valorImovel}
                required
              />
            </div>

            <div>
              <Label htmlFor="valorImovel">Valor Parcela:</Label>
              <TextInput
                onChange={handleChangeReal}
                type="text"
                id="valorParcela"
                value={valorParcela}
                required
              />
            </div>
          </div>

          <div className="grid grid-flow-cols gap-3">
            <div className="col-span-3">
              <Label htmlFor="valorImovel">Valor Inicial Aluguel:</Label>
              <TextInput
                onChange={handleChangeReal}
                type="text"
                id="valorInicialAluguel"
                value={valorInicialALuguel}
                required
              />
            </div>

            <div>
              <Label htmlFor="taxarendimento">
                % Rendimento mensal: &nbsp;&nbsp;&nbsp;&nbsp;
              </Label>
              <TextInput
                onChange={(e) => {
                  setImovelData({
                    ...imovelData,
                    taxaRendimentoMensal: Number(e.target.value),
                  });
                }}
                type="number"
                id="taxarendimento"
                value={imovelData.taxaRendimentoMensal}
                required
              />
            </div>

            <div>
              <Label htmlFor="valorizaçãoDoImóvel">
                % Valorização anual do imóvel:
              </Label>
              <TextInput
                onChange={(e) => {
                  setImovelData({
                    ...imovelData,
                    valorizaçãoDoImovel: Number(e.target.value),
                  });
                }}
                type="number"
                id="valorizaçãoDoImóvel"
                value={imovelData.valorizaçãoDoImovel}
                required
              />
            </div>

            <div>
              <Label htmlFor="anos">Calcular até ... anos:</Label>
              <TextInput
                onChange={(e) => {
                  if (Number(e.target.value) > 0)
                    setImovelData({
                      ...imovelData,
                      anoFinal: Number(e.target.value),
                    });
                }}
                id="anos"
                type="number"
                value={imovelData.anoFinal}
              />
            </div>

            <div className="col-span-3">
              <Label htmlFor="saldoDevedor">
                Saldo devedor em {imovelData.anoFinal} anos:
              </Label>
              <TextInput
                onChange={handleChangeReal}
                id="saldoDevedor"
                value={saldoDevedor}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Label htmlFor="valorImovel">Valor da entrada:</Label>
              <TextInput
                onChange={handleChangeReal}
                type="text"
                id="entrada"
                value={entrada}
                required
              />
              <span className="text-sm absolute top-[2.5rem] right-[1rem]">
                {((imovelData.entrada / imovelData.valorImovel) * 100).toFixed(
                  2
                ) + "%"}
              </span>
              <div className="relative mb-4">
                <RangeSlider
                  onChange={(e) => {
                    setImovelData({
                      ...imovelData,
                      entrada:
                        (imovelData.valorImovel * Number(e.target.value)) / 10,
                    });
                    setEntrada(
                      formatterReal(
                        (imovelData.valorImovel *
                          100 *
                          Number(e.target.value)) /
                          10
                      )
                    );
                  }}
                  id="labels-range-TextInput"
                  defaultValue={5}
                  min="0"
                  max="10"
                />

                <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-0 -bottom-3">
                  0%
                </span>

                <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-[95%] -bottom-3">
                  100%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="taxas">Taxas:</Label>
                <TextInput
                  onChange={handleChangeReal}
                  type="text"
                  id="taxas"
                  value={taxas}
                  required
                />
              </div>

              <div>
                <Label htmlFor="taxas">Total Investido:</Label>
                <TextInput
                  onChange={() => {}}
                  type="text"
                  id="taxas"
                  value={numeroParaReal(imovelData.entrada + imovelData.taxas)}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}
