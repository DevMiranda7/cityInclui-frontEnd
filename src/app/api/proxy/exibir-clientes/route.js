

export async function GET() {
  try {
    const SPRING_URL = process.env.SPRING_API_URL;

    const response = await fetch(`${SPRING_URL}/cityinclui/exibir-clientes`, {
      method: "GET",
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Erro ao buscar clientes" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message || "Erro desconhecido" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
