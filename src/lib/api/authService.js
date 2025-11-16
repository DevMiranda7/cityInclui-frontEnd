
export async function login(email, senha, userType) {
    const response = await fetch('/api/proxy/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, senha, userType }),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Erro ao tentar fazer login');
    }
    return data;

}

