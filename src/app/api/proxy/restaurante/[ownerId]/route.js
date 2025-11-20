import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function GET(_request, context) {
  const params = await context.params;
  const ownerId = params.ownerId;

  if (!ownerId) {
    return NextResponse.json(
      { message: "ID não encontrado." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${SPRING_URL}/cityinclui/restaurante/${ownerId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
 
      cache: "no-store", 
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: { 
        "content-type": contentType,
        // Opcional: Forçar headers de não-cache para o navegador também
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (err) {
    console.error(`Erro no Proxy:`, err);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}