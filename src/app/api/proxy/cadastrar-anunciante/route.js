import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function POST(request) {
    try{
            const formData = await request.formData();

            const resp = await fetch(`${SPRING_URL}/cityinclui/cadastrar-anunciante`,{
                method: "POST",
                body: formData,
                headers:{},
            });

            const contentType = resp.headers.get("content-type") || "application/json";
            const responseBody = await resp.text();

            return new NextResponse(responseBody, {
                status: resp.status,
                headers: {"content-type": contentType },            
            });
        }catch(err) {
        return NextResponse.json(
            { message: "Erro no proxy", detail: err.message }
            , {status: 500}
        );
    }
}   