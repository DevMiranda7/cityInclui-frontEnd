import { NextResponse } from "next/server";
import { Cookie, cookies } from "next/headers";

const SPRING_URL = process.env.SPRING_API_URL;

export async function PUT(request) {
  try {
    const formData = await request.formData();

    const coookieStore = await cookies();
    const token = coookieStore.get("auth_token")?.value;

    if(!token){
      return NextResponse.json({message: "Não autenticado" }, {status: 401});
    }

    const headers = {Authorization: `Bearer ${token}`,};


    const response = await fetch(`${SPRING_URL}/cityinclui/editar-perfil`, {
      method: "PUT",
      body: formData,
      headers,
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: { "content-type": contentType },
    });
  } catch (err) {
    console.error("Erro no Proxy", err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js", detail: err.message },
      { status: 500 }
    );
  }
}
