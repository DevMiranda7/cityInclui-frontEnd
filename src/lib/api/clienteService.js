// src/lib/api/clientService.js

export async function createClient(clientData) {
  try {
    const response = await fetch("/api/proxy/cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao cadastrar cliente");
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao criar cliente:", err);
    throw err;
  }
}

export async function getAllClients() {
  try {
    const response = await fetch("/api/proxy/exibir-clientes");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar clientes");
    }
    return await response.json();
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    throw err;
  }
}


export async function getProfileClient() {
  try {
    const response = await fetch("/api/proxy/perfil-cliente", {
      method: "GET",
      credentials: "include", // mantém o padrão de enviar cookies de autenticação
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Falha ao buscar dados do perfil do cliente: ${response.status}`
      );
    }

    return data;
  } catch (err) {
    console.error("Erro ao buscar dados do perfil do cliente", err);
    throw err;
  }
}

export async function updateClientProfile(dadosFormulario) {
  try {
    // 1. Prepara o objeto exatamente como o UpdateCustomerDTO do Java espera
    const payloadJava = {
      nomeCompleto: dadosFormulario.nome, // Mapeia 'nome' do front para 'nomeCompleto' do Java
      telefone: dadosFormulario.telefone,
    };

    // 2. Envia para o Proxy
    const response = await fetch("/api/proxy/editar-perfil-cliente", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadJava),
    });

    const data = await response.json();

    if (!response.ok) {
      // Tenta pegar a mensagem de validação do DTO (ex: "O nome deve ter entre 3 e 50...")
      const errorMessage = data.message || (data.errors ? data.errors[0] : "Erro ao atualizar perfil");
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Erro no updateClientProfile:", error);
    throw error;
  }
}
