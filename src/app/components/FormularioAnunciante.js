import UploadImagem from "./UploadImagem";

export default function FormularioAnunciante() {
  return (
    <>
      <div>
        <label>Nome do Estabelecimento</label>
        <input
          type="text"
          placeholder="Nome do seu restaurante"
          className="input"
        />
      </div>
      <div>
        <label>CNPJ</label>
        <input type="text" placeholder="00.000.000/0000-00" className="input" />
      </div>
      <div>
        <label>Tipo de Restaurante</label>
        <select className="input" defaultValue="">
          <option value="" disabled>
            Selecione o tipo
          </option>
          <option value="japones">Japonês</option>
          <option value="italiano">Italiano</option>
          <option value="caseiro">Caseiro</option>
          <option value="vegano">Vegano</option>
          <option value="fast-food">Fast Food</option>
        </select>
      </div>
      <UploadImagem />
    </>
  );
}
