# ImoCRM — CRM Imobiliário Zero Cost

> CRM completo para corretores: portal público de imóveis + painel administrativo.  
> Stack: **React 18 · Tailwind CSS · Supabase · Vite**  
> Custo de hospedagem: **R$ 0 / mês** (Supabase Free + Vercel/Netlify Free)

---

## Estrutura do Projeto

```
imocrm/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/            # Botões, Inputs, Modal, Toast, Toggle, Spinner
│   │   ├── public/        # Nav, PropertyCard, PropertyFilters, LeadModal
│   │   └── admin/         # AdminNav, Sidebar, PropertyForm, StatCard
│   ├── hooks/
│   │   ├── useAuth.js         # Login/logout + Supabase Auth
│   │   ├── useProperties.js   # CRUD de imóveis
│   │   └── useLeads.js        # CRUD de leads
│   ├── lib/
│   │   ├── supabase.js    # Cliente Supabase
│   │   ├── constants.js   # Tipos, status, WhatsApp, broker info
│   │   ├── utils.js       # formatPrice, slugify, initials…
│   │   └── mockData.js    # Dados de demonstração (sem Supabase)
│   ├── pages/
│   │   ├── public/
│   │   │   ├── CatalogPage.jsx         # Listagem + filtros + hero
│   │   │   └── PropertyDetailPage.jsx  # Detalhes + CTA WhatsApp
│   │   └── admin/
│   │       ├── LoginPage.jsx       # Autenticação
│   │       ├── DashboardLayout.jsx # Shell com sidebar
│   │       ├── OverviewPage.jsx    # Métricas + resumos
│   │       ├── PropertiesPage.jsx  # CRUD de imóveis
│   │       ├── LeadsPage.jsx       # Gestão de leads
│   │       └── AnalyticsPage.jsx   # Gráficos de visualizações
│   ├── App.jsx       # Roteamento / orquestração de estado
│   ├── main.jsx
│   └── index.css
├── supabase/
│   └── schema.sql    # Tabelas + RLS + seed data
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Início Rápido (Demo Local)

Funciona **sem Supabase** — usa dados mockados automaticamente.

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

**Login demo:** `demo@imocrm.com` / `demo1234`

---

## Configurando o Backend Real (Supabase)

### 1 · Crie um projeto Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita.
2. Clique em **New Project** e escolha um nome e senha.
3. Aguarde o projeto inicializar (~2 min).

### 2 · Crie as tabelas

1. No painel do Supabase, clique em **SQL Editor → New Query**.
2. Cole o conteúdo de `supabase/schema.sql` e clique em **Run**.

Isso cria as tabelas `properties`, `leads` e `analytics`, configura RLS e insere dados de exemplo.

### 3 · Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com os dados do seu projeto (encontre em **Settings → API**):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

VITE_WHATSAPP_NUMBER=5511999999999
VITE_BROKER_NAME=Seu Nome
VITE_BROKER_CRECI=12345-SP
VITE_BROKER_EMAIL=voce@email.com
```

### 4 · Crie o usuário do corretor

No Supabase: **Authentication → Users → Invite user** (ou Add user).  
Use o e-mail e senha que você vai usar para acessar o painel.

### 5 · Reinicie o servidor

```bash
npm run dev
```

---

## Deploy Gratuito

### Vercel (recomendado)

```bash
npm install -g vercel
vercel --prod
```

Na Vercel, adicione as variáveis de ambiente em  
**Project → Settings → Environment Variables**.

### Netlify

```bash
npm run build
# Faça upload da pasta `dist` no painel do Netlify
# ou conecte ao repositório GitHub
```

Adicione as variáveis em **Site → Environment variables**.

---

## Tabelas do Banco

| Tabela | Descrição |
|---|---|
| `properties` | Imóveis com slug, fotos, preço, status de publicação e contador de views |
| `leads` | Contatos capturados pelo portal público com status de atendimento |
| `analytics` | Evento de visualização por imóvel (dispara trigger que incrementa `properties.views`) |

### Permissões (RLS)

| Operação | Anônimo (público) | Autenticado (corretor) |
|---|---|---|
| Ler imóveis publicados | ✅ | ✅ |
| Ler/editar todos imóveis | ❌ | ✅ |
| Inserir lead | ✅ | ✅ |
| Ler/editar leads | ❌ | ✅ |
| Inserir analytics | ✅ | ✅ |
| Ler analytics | ❌ | ✅ |

---

## Funcionalidades

### Portal Público
- Hero com imagem de fundo e CTA
- Catálogo com cards responsivos (foto, preço, tipo, quartos, área)
- Filtros por texto, tipo e número de quartos
- Página de detalhe com galeria de fotos, specs e mapa de diferenciais
- Modal "Tenho Interesse" → salva lead direto no CRM
- Botão fixo de WhatsApp com mensagem pré-preenchida
- CTA flutuante mobile (Interesse + WhatsApp)
- Seção de contato livre no rodapé

### Painel Administrativo
- Login com e-mail/senha via Supabase Auth
- Dashboard com 4 métricas, ranking de imóveis e leads recentes
- CRUD completo de imóveis com toggle Publicar/Despublicar
- Gestão de leads com filtro por status e link direto para WhatsApp
- Analytics com barras de progresso e gráfico de tendência (views × leads)

---

## Personalização Rápida

| O que mudar | Onde |
|---|---|
| Nome / CRECI / WhatsApp do corretor | `.env` |
| Tipos de imóvel disponíveis | `src/lib/constants.js → PROPERTY_TYPES` |
| Status de lead disponíveis | `src/lib/constants.js → LEAD_STATUSES` |
| Cores e fontes | `tailwind.config.js` + `src/index.css` |
| Foto do hero | `src/pages/public/CatalogPage.jsx` (URL da imagem) |
| Dados de demo | `src/lib/mockData.js` |

---

## Licença

MIT — use, modifique e distribua livremente.
