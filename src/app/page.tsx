"use client";
import "./globals.css";
import Image from "next/image";
import logo from "../../public/logo.png";
import { ReactNode, useState } from "react";
import Financiamento from "./components/Financiamento";
import { createContext } from "react";
import ImovelDataContext, { ImovelData } from "./contexts/imovelData";

export default function Home() {
  const [context, setContext] = useState<"avista" | "financiamento">(
    "financiamento"
  );

  const ImovelDataProvider = ({ children }: { children: ReactNode }) => {
    const [imovelData, setImovelData] = useState<ImovelData>({
      valorImovel: 180000,
      entrada: 36000,
      taxas: 4000,
      saldoPessoal: 180000,
      taxaRendimentoMensal: 1,
      valorParcela: 763,
      valorInicialAluguel: 700,
      anoFinal: 6,
      valorAluguel: [700, 756, 816.48, 881.79, 952.34, 1028.52],
      patrimonioInvestimento: 0,
      valorizaçãoDoImovel: 8,
      saldoDevedor: 133211.89,
      valorImóvelValorizado: 285637
    });

    return (
      <ImovelDataContext.Provider value={{ imovelData, setImovelData }}>
        {children}
      </ImovelDataContext.Provider>
    );
  };

  const tabStyle = {
    active:
      "inline-block p-4 text-blue-600 cursor-pointer bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500",
    deactive:
      "inline-block p-4 rounded-t-lg cursor-pointer hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300",
    disabled:
      "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500",
  };

  return (
    <>
      <div className="flex justify-between p-10">
        <div className="w-[100px]">
          <h1 className="text-2xl text-gray-900 lg:inline hidden">
            Cálculo imobiliário
          </h1>
        </div>

        <div>
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="me-2">
              <a
                onClick={() => setContext("avista")}
                className={
                  context === "avista" ? tabStyle.active : tabStyle.deactive
                }
              >
                Compra a vista
              </a>
            </li>
            <li className="me-2">
              <a
                onClick={() => setContext("financiamento")}
                aria-current={"page"}
                className={
                  context === "financiamento"
                    ? tabStyle.active
                    : tabStyle.deactive
                }
              >
                Financiamento
              </a>
            </li>
            <li className="me-2">
              <a className={tabStyle.disabled}>Outro (em breve)</a>
            </li>
          </ul>
        </div>

        <div>
          <Image
            className="invert"
            height={100}
            width={100}
            alt="Parisotto"
            src={logo.src}
          />
        </div>
      </div>
      <ImovelDataProvider>
        {context === "financiamento" && <Financiamento />}
      </ImovelDataProvider>
    </>
  );
}
