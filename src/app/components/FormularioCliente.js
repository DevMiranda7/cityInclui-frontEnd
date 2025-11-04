export default function FormularioCliente() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            placeholder="Seu nome completo"
            className="input"
          />
        </div>
        <div>
          <label>Telefone</label>
          <input type="tel" placeholder="(00) 00000-0000" className="input" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="input"
          />
        </div>
        <div>
          <label>Confirmar E-mail</label>
          <input type="email" placeholder="Repita o e-mail" className="input" />
        </div>
      </div>
    </>
  );
}
