import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function POST(request) {
  try {
    const formData = await request.formData();

    const response = await fetch(
      `${SPRING_URL}/cityinclui/cadastrar-anunciante`,
      {
        method: "POST",
        body: formData,
        headers: {},
      }
    );

    const contentType =
      response.headers.get("content-type") || "application/json";
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: { "content-type": contentType },
    });
  } catch (err) {
    console.error("Erro no Proxy (POST /cadastrar-anunciante):", err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js", detail: err.message },
      { status: 500 }
    );
  }
}
