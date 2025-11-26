import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SPRING_URL = process.env.NEXT_PUBLIC_SPRING_API_URL;


export async function GET(request, context) {
  const params = await context.params;
  const ownerId = params.ownerId;

  try {
    const response = await fetch(`${SPRING_URL}/cityinclui/owner/${ownerId}/avaliacoes`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar avaliações" }, { status: 500 });
  }
}

export async function POST(request, context) {
  const params = await context.params;
  const ownerId = params.ownerId;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();

    const payload = {
      nota: body.rating,
      comentario: body.comentario
    };

    const response = await fetch(`${SPRING_URL}/cityinclui/owner/${ownerId}/avaliacoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Erro proxy review:", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}