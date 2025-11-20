import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const response = await fetch(`${SPRING_URL}/cityinclui/perfil-anunciante`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text();
    const contentType =
      response.headers.get("content-type") || "application/json";

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "content-type": contentType,
      },
    });
  } catch (err) {
    console.error("Erro no proxy", err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js" },
      { status: 500 }
    );
  }
}
