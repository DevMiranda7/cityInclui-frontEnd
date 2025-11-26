import { NextResponse } from "next/server";

const SPRING_URL = process.env.NEXT_PUBLIC_SPRING_API_URL;

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${SPRING_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const token = response.headers.get("Authorization");

    const tokenJson = data.token;

    const sessionToken = token || tokenJson;

    if (!sessionToken) {
      console.error("Nenhum token recebido do backend");
      return NextResponse.json(
        { message: "Token não recebido do servidor" },
        { status: 500 }
      );
    }

    const res = NextResponse.json(data, { status: 200 });

    res.cookies.set("auth_token", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err) {
    console.error("Erro no Proxy", err);
    return NextResponse.json(
      { message: "Erro interno do servidor Next.js" },
      { status: 500 }
    );
  }
}
