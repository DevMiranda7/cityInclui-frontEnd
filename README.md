# CityInclui — Front-end

Interface web do **CityInclui**, um site que ajuda pessoas com deficiência visual a encontrar restaurantes com recursos de acessibilidade. O diferencial do projeto é uma **leitura por voz própria**, integrada à navegação por mouse e por teclado, que descreve a interface enquanto a pessoa navega. Projeto universitário.

> Este repositório contém o **front-end**. A API (Spring WebFlux) está em [cityInclui-backEnd](https://github.com/DevMiranda7/cityInclui-backEnd).

## Funcionalidades

- **Leitura por voz** de títulos, campos, botões, mensagens de erro, modais e resultados, com opção de ligar e desligar no cabeçalho.
- **Busca de restaurantes** por nome ou tipo de culinária, com sugestões enquanto a pessoa digita, filtro por categoria e resultados paginados.
- **Destaques na página inicial:** carrossel com os restaurantes mais bem avaliados.
- **Página do restaurante:** fotos, descrição, tipo de culinária, recursos de acessibilidade e avaliações.
- **Cadastro de clientes e de anunciantes** (restaurantes), com envio de foto.
- **Login** com dois perfis: cliente e restaurante.
- **Avaliações:** clientes logados avaliam com nota de 1 a 5 e comentário.
- **Edição de perfil** para clientes e anunciantes.

## Como a leitura por voz funciona

A voz usa a **Web Speech API** do navegador (`speechSynthesis`), em português do Brasil, sem serviço externo.

- Um contexto global (`SpeechContext`) expõe `safeSpeak`, `handleFocusWithKeyboard` e o controle de ligar/desligar.
- A fala dispara ao **passar o mouse** sobre um elemento e ao **focar com o teclado**. O contexto detecta se a última interação foi a tecla Tab, para não falar em dobro quando o foco vem do clique.
- Cada nova fala cancela a anterior e tem um pequeno atraso, para evitar sobreposição.
- A leitura vem **ligada por padrão**, e a preferência fica salva no navegador.
- Mensagens de erro, sucesso e carregamento também são faladas.

As vozes disponíveis dependem do navegador e do sistema operacional da pessoa.

## Stack

| Camada | Tecnologias |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Estilo | CSS Modules |
| Dados no cliente | SWR, `fetch` |
| Animação e ícones | Framer Motion, Lucide React |
| Autenticação | JWT (decodificado com `jwt-decode`), cookie HttpOnly |
| Voz | Web Speech API |
| Hospedagem | AWS Amplify, domínio no Route 53 |

## Arquitetura

O navegador **nunca fala direto com a API Java**. Todas as chamadas passam por rotas do próprio Next.js (`/api/proxy/*`), que repassam a requisição ao back-end e anexam o token a partir de um cookie HttpOnly:

```
Navegador ──► /api/proxy/*  (Next.js, servidor) ──► API Spring (/cityinclui/*)
                  │
                  └─ lê o cookie auth_token e envia Authorization: Bearer <token>
```

Estrutura:

```
src/
├── app/
│   ├── api/proxy/        # Rotas que repassam as chamadas para a API
│   ├── components/       # Header, Footer, busca, carrossel, formulários, modal...
│   ├── context/          # AuthContext e SpeechContext
│   ├── login/            # Página de login
│   ├── register/         # Cadastro de cliente e de anunciante
│   ├── resultados/       # Resultados da busca, com paginação
│   ├── restaurante/[id]/ # Página do restaurante
│   └── editar/           # Edição de perfil (cliente e anunciante)
├── hooks/
└── lib/api/              # Serviços que chamam as rotas de proxy
```

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Busca e carrossel de destaques |
| `/login` | Login de cliente ou restaurante |
| `/register` | Cadastro de cliente ou anunciante |
| `/resultados?q=termo` | Resultados paginados da busca |
| `/restaurante/[id]` | Detalhes, avaliações e formulário de avaliação |
| `/editar` | Edição do perfil do usuário logado |

## Rotas de proxy

| Rota | Método | Repassa para a API |
|---|---|---|
| `/api/proxy/auth/login` | POST | `/auth/login` (grava o cookie `auth_token`) |
| `/api/proxy/auth/logout` | POST | Limpa o cookie |
| `/api/proxy/cadastrar-cliente` | POST | `/cityinclui/cadastrar-cliente` |
| `/api/proxy/cadastrar-anunciante` | POST | `/cityinclui/cadastrar-anunciante` |
| `/api/proxy/restaurantes` | GET | `/cityinclui/restaurantes/top5` |
| `/api/proxy/restaurante/[ownerId]` | GET | `/cityinclui/restaurante/{id}` |
| `/api/proxy/buscar-restaurantes` | GET | `/cityinclui/pesquisa` |
| `/api/proxy/avaliacoes/[ownerId]` | GET, POST | `/cityinclui/owner/{id}/avaliacoes` |
| `/api/proxy/perfil-cliente` | GET | `/cityinclui/cliente/me` |
| `/api/proxy/editar-perfil-cliente` | PUT | `/cityinclui/editar-cliente` |
| `/api/proxy/perfil-owner` | GET | `/cityinclui/perfil-anunciante` |
| `/api/proxy/editar-perfil-owner` | PUT | `/cityinclui/editar-perfil` |

## Como executar

### Pré-requisitos

- Node.js 18.18 ou superior (recomendado 20 ou mais recente)
- A API do [back-end](https://github.com/DevMiranda7/cityInclui-backEnd) em execução

### Variável de ambiente

Crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_SPRING_API_URL=http://localhost:8080
```

Use a URL base da API, sem barra no final. O arquivo `.env.local` já está no `.gitignore`.

### Rodando

```bash
git clone https://github.com/DevMiranda7/cityInclui-frontEnd.git
cd cityInclui-frontEnd
npm install
npm run dev
```

O site abre em `http://localhost:3000`.

Outros comandos:

```bash
npm run build   # build de produção
npm start       # servidor de produção
npm run lint    # ESLint
```

O cookie de sessão é marcado como `Secure`. No desenvolvimento, acesse por `localhost`: alguns navegadores podem não aceitar esse cookie em HTTP.

## Acessibilidade

- Idioma da página definido como `pt-BR`.
- Leitura por voz para mouse e teclado, com controle para desligar.
- Rótulos e atributos ARIA em botões de alternância, paginação, filtros, modais de mensagem e na lista de resultados.
- Validação de imagens no envio: tipo e tamanho máximo de 10 MB, com aviso falado e escrito.
- Mensagens de erro e sucesso lidas ao aparecerem.

## Deploy

- **Front-end:** AWS Amplify, com a variável `NEXT_PUBLIC_SPRING_API_URL` configurada no ambiente de build.
- **API:** AWS Elastic Beanstalk.
- **Domínio:** Route 53.

## Autores

- Luan Miranda
- Emerson Leandro
- Felipe Wozniak
- Gabriel Pigozzi
- Gustavo Renner
- Daniel Tolledo
- Isaias Dias
