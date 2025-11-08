import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function GET() {
  try {
    const response = await fetch(`${SPRING_URL}/cityinclui/restaurantes`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 300 }, // Cache de 5min
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: { "content-type": contentType },
    });
  } catch (err) {
    console.error("Erro no Proxy (GET /restaurantes):", err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js", detail: err.message },
      { status: 500 }
    );
  }
}
