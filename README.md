# React User Management App

## Descrição
Este é um projeto de dashboard de usuários criado com React. Permite visualizar, criar, editar e excluir usuários (quando o backend suporta). O projeto utiliza uma série de bibliotecas modernas para facilitar o desenvolvimento e o gerenciamento de estado e dados assíncronos.

## Ferramentas e Bibliotecas Utilizadas
- React: biblioteca principal para construção da interface.
- React Router: gerenciamento de rotas no frontend.
- Ant Design: biblioteca de componentes UI para React.
- Axios: cliente HTTP para requisições à API.
- TypeScript: tipagem estática para maior segurança e manutenção.
- DummyJSON: API de teste para simulação de dados de usuários.

## Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- Node.js (versão recomendada >= 18)
- npm ou yarn
- Git

## Instalação
1. Clone o repositório:
```bash
git clone https://github.com/serafimschoffen/React-App.git
```

2. Entre na pasta do projeto:
```bash
cd React-App
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## Execução Local
Para rodar o projeto em modo de desenvolvimento:
```bash
npm run dev
```
- O projeto será aberto no navegador em `http://localhost:5173/login`.

## Estrutura de Pastas
- `src/pages/`: páginas da aplicação como Login, Dashboard e UserDetails.
- `src/components/`: componentes reutilizáveis, como Header e UserTable.
- `src/utils/`: utilitários e funções de suporte, incluindo `auth` e `api`.
- `src/App.tsx`: configurações de rotas e ProtectedRoute.
- `src/main.tsx`: ponto de entrada da aplicação.

## Funcionalidades
- Login com gerenciamento de sessão e roles (Admin/User).
- Dashboard com tabela de usuários.
- Criação, edição e exclusão de usuários via modal (dependendo do backend).
- Visualização de detalhes de usuários.
- Controle de acesso a rotas protegidas baseado no role do usuário.
- Dark mode configurável pelo usuário.

## Observações
- O projeto utiliza a API DummyJSON como backend de teste. Algumas operações como atualização ou exclusão podem não refletir mudanças reais na API pública.
- Para teste das funcionalidades, recomendo uso do usuário emilys e senha emilyspass.

## Licença
Este projeto é de uso pessoal/educacional. Modifique conforme necessário para seus projetos.
