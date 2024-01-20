import CardDadosImóvel from "./CardDadosImóvel";
import TableRendimento from "./TableRendimento";
import TableValorizaçãoAluguel from "./TableValorizaçãoAluguel";

export default function Financiamento() {
  return (
    <>
      <div className="grid grid-cols-12 px-10 gap-20 gap-y-5 justify-center">
        <CardDadosImóvel />
        <TableValorizaçãoAluguel />
        <TableRendimento />
      </div>
    </>
  );
}
