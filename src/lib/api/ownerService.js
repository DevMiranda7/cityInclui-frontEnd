export async function createOwner(ownerData, foto = []) {
  try {
    const formData = new FormData();
    formData.append(
      "owner",
      new Blob([JSON.stringify(ownerData)], { type: "application/json" })
    );

    foto.forEach((file) => formData.append("photos", file));

    const res = await fetch("/api/proxy/cadastrar-anunciante", {
      method: "POST",
      body: formData,
    });

    const responseText = await res.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = { message: responseText || "Erro desconhecido" };
    }

    if (!res.ok) {
      throw new Error(data.message || `Erro ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("Erro ao enviar anunciante:", err);
    throw err;
  }
}

export async function getRestaurantes() {
  try {
    const response = await fetch("/api/proxy/restaurantes", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao buscar restaurantes");
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao tentar exibir os restaurantes", err);
    throw err;
  }
}

export async function getRestauranteById(ownerId) {
  try {
    const response = await fetch(`/api/proxy/restaurante/${ownerId}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao buscar restaurante");
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao tentar exibir o restaurante", err);
    throw err;
  }
}

export async function searchRestaurants(query = "", page = 0, size = 9) {
  const params = new URLSearchParams({ q: query, page, size });
  const response = await fetch(
    `/api/proxy/buscar-restaurantes?${params.toString()}`
  );
  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error("Resposta do servidor não é JSON válido");
  }

  if (!response.ok) {
    throw new Error(data.message || `Erro ${response.status}`);
  }
  return data;
}
