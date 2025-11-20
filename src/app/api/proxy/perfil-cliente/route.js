import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const response = await fetch(`${SPRING_URL}/cityinclui/cliente/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json(); // já decodifica JSON

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Erro no proxy do client", err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js" },
      { status: 500 }
    );
  }
}
