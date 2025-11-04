export default function AlternadorUsuario({ tipoUsuario, setTipoUsuario }) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => setTipoUsuario("cliente")}
        className={`flex flex-col items-center justify-center p-6 border rounded-xl w-40 transition-all ${
          tipoUsuario === "cliente"
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        <span className="text-4xl mb-2">👤</span>
        <span className="font-semibold text-gray-800">Cliente</span>
        <span className="text-xs text-gray-500">
          Busco restaurantes acessíveis
        </span>
      </button>

      <button
        onClick={() => setTipoUsuario("anunciante")}
        className={`flex flex-col items-center justify-center p-6 border rounded-xl w-40 transition-all ${
          tipoUsuario === "anunciante"
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        <span className="text-4xl mb-2">🏪</span>
        <span className="font-semibold text-gray-800">Anunciante</span>
        <span className="text-xs text-gray-500">Tenho um estabelecimento</span>
      </button>
    </div>
  );
}
