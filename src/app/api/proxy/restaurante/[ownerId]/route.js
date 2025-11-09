import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function GET(_request, { params }) {
  const ownerId = params?.ownerId;

  if (!ownerId) {
    return NextResponse.json(
      { message: "ID do proprietário não encontrado na rota." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${SPRING_URL}/cityinclui/restaurante/${ownerId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: { "content-type": contentType },
    });
  } catch (err) {
    console.error(`Erro no Proxy (GET /restaurante/${ownerId}):`, err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js", detail: err.message },
      { status: 500 }
    );
  }
}
