# 🧠 NeuroPulse — Plataforma de Avaliação Psicológica e Acompanhamento Terapêutico

NeuroPulse é uma aplicação fullstack moderna que permite psicólogos aplicarem escalas clínicas e de bem-estar, acompanharem a evolução dos pacientes, e gerarem relatórios analíticos com gráficos, percentis, e cálculos estatísticos como RCI (Reliable Change Index).

**Observação:** Este repositório contém o código corrigido e pronto para deploy manual.

---

## 🚀 Funcionalidades principais

- 📝 Aplicação de escalas baseadas em SurveyJS
- 📈 Cálculo automático de escore total, RCI, z-score e percentis
- 📊 Visualização gráfica da evolução do paciente
- 🔐 Autenticação com JWT (Terapeuta)
- 📎 Exportação de relatórios em PDF (Funcionalidade futura)
- 📚 Escalas baseadas em instrumentos validados (PHQ-9, DASS-21, GAD-7, PsyFlex, MPFI, WHOQOL, etc.)

---

## 🛠️ Tecnologias utilizadas

| Camada        | Tecnologias                      |
|---------------|----------------------------------|
| Frontend      | React + Vite + SurveyJS + TailwindCSS |
| Backend       | Node.js + Express + Prisma ORM   |
| Banco de Dados| PostgreSQL                       |
| Autenticação  | JWT (JSON Web Token) + Bcrypt    |

---

## 📦 Estrutura de diretórios (Simplificada)

```txt
NeuroPulse/
├── backend/          # Código do backend (Node.js/Express)
│   ├── src/          # Código fonte
│   ├── prisma/       # Schema e migrações do banco
│   ├── .env.example  # Exemplo de variáveis de ambiente
│   └── package.json  # Dependências e scripts
├── frontend/         # Código do frontend (React/Vite)
│   ├── src/          # Código fonte
│   ├── .env.example  # Exemplo de variáveis de ambiente
│   └── package.json  # Dependências e scripts
└── README.md         # Este arquivo
```

---

## ☁️ Deploy em Produção (Manual)

Siga estes passos para implantar o NeuroPulse em serviços de hospedagem gratuitos.

### 1. Backend (Ex: Render, Railway)

   a.  **Prepare o Código:** Faça o upload do conteúdo do arquivo `neuro-pulse-backend-corrigido.zip` para um repositório Git (GitHub, GitLab, etc.).
   b.  **Crie um Banco de Dados PostgreSQL:** Utilize um serviço de banco de dados gerenciado (ex: Neon, Supabase, ElephantSQL, ou o próprio addon do Render/Railway).
   c.  **Configure a Plataforma de Hospedagem (Render/Railway):**
       *   Crie um novo "Web Service" (Render) ou "Service" (Railway) conectado ao seu repositório Git.
       *   **Variáveis de Ambiente:** Configure as seguintes variáveis de ambiente na plataforma:
           *   `DATABASE_URL`: A string de conexão completa do seu banco de dados PostgreSQL criado no passo anterior (ex: `postgresql://usuario:senha@host:porta/database`).
           *   `JWT_SECRET`: Uma chave secreta forte e única para assinar os tokens JWT (gere uma chave segura).
       *   **Comando de Build:** Geralmente `npm install` (a plataforma detecta `package.json`).
       *   **Comando de Start:** `npm start` (configurado no `package.json`).
       *   **Health Check (Opcional):** Configure um endpoint de health check se a plataforma oferecer (ex: `/api/health`).
   d.  **Execute as Migrações:** Após o primeiro deploy bem-sucedido, você pode precisar executar as migrações do Prisma manualmente através do console da plataforma ou conectando-se ao banco. O comando `npx prisma migrate deploy` é geralmente usado em produção.
   e.  **Anote a URL Pública:** Após o deploy, a plataforma fornecerá uma URL pública para o seu backend (ex: `https://seu-backend.onrender.com`). Guarde esta URL.

### 2. Frontend (Ex: Vercel, Netlify)

   a.  **Prepare o Código:** Faça o upload do conteúdo do arquivo `neuro-pulse-frontend-corrigido.zip` para o mesmo ou outro repositório Git.
   b.  **Configure a Plataforma de Hospedagem (Vercel/Netlify):**
       *   Crie um novo projeto/site conectado ao seu repositório Git.
       *   **Framework Preset:** Selecione "Vite".
       *   **Variáveis de Ambiente:** Configure a seguinte variável de ambiente:
           *   `VITE_API_URL`: Cole a URL pública do seu backend implantado no passo anterior (ex: `https://seu-backend.onrender.com`).
       *   **Comando de Build:** `npm run build`.
       *   **Diretório de Publicação:** `dist`.
   c.  **Deploy:** Inicie o deploy.
   d.  **Acesse a Aplicação:** Após o deploy, a plataforma fornecerá uma URL pública para acessar o NeuroPulse (ex: `https://seu-frontend.vercel.app`).

---

## 🧪 Testar a Aplicação Online

Após o deploy bem-sucedido do backend e frontend:

1.  Acesse a URL pública do frontend.
2.  Utilize as credenciais de teste para fazer login:
    *   **Email:** `neuro@pulse.com`
    *   **Senha:** `senha123`
3.  Explore o dashboard, visualize detalhes das sessões (se houver dados do seed) e teste o envio de novas escalas (se a funcionalidade estiver implementada no frontend).

---

## 📐 Escalas e Análises

O sistema está preparado para trabalhar com diversas escalas (PHQ-9, GAD-7, DASS-21, etc.) e realizar análises automáticas como score total, RCI, z-score e percentil, embora a implementação completa da interface para todas as escalas e relatórios possa necessitar de desenvolvimento adicional.

