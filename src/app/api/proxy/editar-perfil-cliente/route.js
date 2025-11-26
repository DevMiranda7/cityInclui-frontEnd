import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SPRING_URL = process.env.NEXT_PUBLIC_SPRING_API_URL;

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();


    const response = await fetch(`${SPRING_URL}/cityinclui/editar-cliente`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Erro no Proxy de Edição:", error);
    return NextResponse.json(
      { message: "Erro interno ao conectar com o servidor." },
      { status: 500 }
    );
  }
}
