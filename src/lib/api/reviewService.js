export async function getReviews(ownerId) {
  try {

    const res = await fetch(`/api/proxy/avaliacoes/${ownerId}`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
}

export async function createReview(ownerId, reviewData) {
  try {
    const res = await fetch(`/api/proxy/avaliacoes/${ownerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao enviar avaliação");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}