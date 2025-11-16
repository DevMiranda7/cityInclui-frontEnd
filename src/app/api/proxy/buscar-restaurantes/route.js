import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const page = searchParams.get("page") || "0";
    const size = searchParams.get("size") || "9";
    

    const url = `${SPRING_URL}/cityinclui/pesquisa?q=${encodeURIComponent(
      query
    )}&page=${page}&size=${size}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    const data = await response.json();
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (err) {
    console.error("Erro no Proxy", err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js", detail: err.message },
      { status: 500 }
    );
  }
}
