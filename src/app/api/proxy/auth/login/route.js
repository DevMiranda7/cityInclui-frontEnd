import { NextResponse } from "next/server";

const SPRING_URL = process.env.SPRING_API_URL;

export async function POST(request) {
    try{
        const body = await request.json();

        const response = await fetch(`${SPRING_URL}/auth/login`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        
        if(!response.ok){
            return NextResponse.json(data, {status: response.status });
        }

        return NextResponse.json(data, {status: 200 });
    }catch(err) {
        console.error("Erro no Proxy", err);
        return NextResponse.json(
            {message: "Erro interno do servidor Next.js" },
            {status: 500 }
        );
    }
    
}