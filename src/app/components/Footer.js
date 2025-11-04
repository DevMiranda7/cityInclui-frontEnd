export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-center md:text-left">
        <div>
          <h4 className="font-semibold text-lg mb-2">CityInclui</h4>
          <p className="text-sm text-gray-300">
            Encontrando restaurantes acessíveis para todos
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Contato</h4>
          <p className="text-sm text-gray-300">contato@cityinclui.com.br</p>
          <p className="text-sm text-gray-300">(11) 4002-8922</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Redes Sociais</h4>
          <p className="text-sm text-gray-300">
            Facebook | Instagram | Twitter
          </p>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-400">
        © 2025 CityInclui. Todos os direitos reservados.
      </div>
      <div className="text-center mt-3">
        <button className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-semibold hover:bg-yellow-300 transition">
          Restaurante Sugestão
        </button>
      </div>
    </footer>
  );
}
