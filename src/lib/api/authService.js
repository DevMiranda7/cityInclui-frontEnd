export async function login(email, senha, userType) {
  const normalizedType = userType.toLowerCase(); 

  const response = await fetch('/api/proxy/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha, userType: normalizedType }),
    credentials: 'include', 
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao tentar fazer login');
  }

  if (normalizedType === "owner") {
    sessionStorage.setItem("isOwner", "true");
  } else {
    sessionStorage.removeItem("isOwner");
  }

  return data;
}
