"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditarRestaurante from "../components/editarrestaurante/EditarRestaurante";

export default function EditarPage() {
  const [dadosRestaurante, setDadosRestaurante] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

  // Simula carregamento dos dados do restaurante
  useEffect(() => {
    const carregarDadosRestaurante = async () => {
      try {
        setCarregando(true);
        
        // Dados mockados para exemplo
        const dadosMockados = {
          nomeDoRestaurante: "Sabor & Arte Restaurante",
          nomeDoAnunciante: "Maria Santos",
          email: "maria@saborearte.com",
          telefone: "11987654321",
          descricao: "Um restaurante acolhedor especializado em culinária brasileira contemporânea. Oferecemos cardápio em braile, atendimento em libras, rampas de acesso e banheiros adaptados. Ambiente familiar com opções vegetarianas e veganas. Estacionamento próprio e fácil acesso para cadeirantes.",
          cardapio: [
            {
              nome: "Feijoada Completa",
              preco: "45.90",
              categoria: "Pratos Principais",
              descricao: "Feijoada tradicional com acompanhamentos"
            },
            {
              nome: "Moqueca de Peixe",
              preco: "52.50",
              categoria: "Pratos Principais", 
              descricao: "Moqueca capixaba com peixe fresco"
            }
          ],
          // CORREÇÃO: Array em vez de objeto
          acessibilidades: [
            "Rampa de acesso",
            "Banheiro adaptado",
            "Cardápio em Braille"
          ],
          foto: "/images/restaurante.jpg"
        };

        setDadosRestaurante(dadosMockados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados do restaurante");
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosRestaurante();
  }, []);

  const handleSalvar = async (dadosAtualizados) => {
    try {
      setSalvando(true);
      
      // Simulando sucesso
      console.log("Dados atualizados:", dadosAtualizados);
      setDadosRestaurante(dadosAtualizados);
      
      // Mostra mensagem de sucesso
      alert("Alterações salvas com sucesso!");
      
      // Redireciona de volta para o perfil
      router.push("/perfil");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    if (window.confirm("Tem certeza que deseja cancelar? As alterações não salvas serão perdidas.")) {
      router.back();
    }
  };

  if (carregando) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p>Carregando dados do restaurante...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={handleCancelar}
          style={{ background: 'none', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
        >
          ← Voltar
        </button>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Editar Informações do Restaurante</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Atualize as informações do seu restaurante abaixo</p>

        {dadosRestaurante ? (
          <EditarRestaurante 
            initialData={dadosRestaurante}
            onSave={handleSalvar}
            onCancel={handleCancelar}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Não foi possível carregar os dados do restaurante.</p>
            <button 
              onClick={() => window.location.reload()}
              style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>

      {salvando && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p>Salvando alterações...</p>
          </div>
        </div>
      )}
    </div>
  );
}