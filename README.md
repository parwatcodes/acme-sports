# Acme Sports

Acme Sports is a full-stack web application I built using **Next.js**, **Prisma**, **Axios**, **Tailwind CSS**, and **PostgreSQL**. This app displays and manages sports-related data—currently focused on NFL teams—with the potential to scale into other leagues.

## My Initiative on Tech Stack, UI and SEO

As this is the ACME sports first website and they don't understand tech, UX, or SEO and they are relying on my aspects of this initiative.

Therefore for the rapid app development i intended to choose for next.js as it is a full-stack web framework which will solve the issue or cross domain integration b/w frontend and backend.

Also, the clients don't understand UX so it is crucial for me to create a fully working website with most of leagues shown and various sub sections for each leagues like news, stats, standings, schedule and many more

This is a full website which contains headers and sub headers and teams list for NFL when navigated `/nfl/teams` (this is client-side routing)

Also Client wants this to be SEO done, so for this i have done SSR in teams list, when navigated to `/nfl/teams` the html is rendered from server with data.


To simulate a real-world scenario where users access web services via authenticated requests—typically using an API key. I have implemented:

- ✅ User authentication using API keys
- ✅ Dynamic and filterable data (like NFL teams)
- ✅ Server-rendered pages for SEO
- ✅ Full-stack development using the latest Next.js App Router

## 📦 Installation

1. Download the ZIP.
2. Unzip and navigate to the `acme-sports` directory.
3. Install dependencies:

```bash
npm install
```

**It will work without running the seed because i have used remote db and already seeded the data and .env local file contains API KEY and pg db connection url** or to use own db change the `DATABASE_URL` in `.env` file and seed data and copy the `API_KEY` and keep in `.env`.


4. Seed the database:

This script creates a default user, generates an API key, and seeds the NFL team data. API key will be displayed in terminal.

```bash
node src/app/seed/init.ts
```

To run the application in dev mode.
```bash
npm run dev
```

Navigate to app.
```bash
http://localhost:3000
```

---

## 🎨 UI/UX + SEO

The client had no specific design or UX expectations, so I took the initiative to build a clean, modern layout with logical navigation, responsiveness, and search/filtering.

- `/nfl/teams` lists all NFL teams with filtering, grouping, and search (Client side routing).
- Group by **conference** or **division**.
- Sort by **name**, **conference**, or **division**.
- All functionality works both client-side and server-side.
- SSR ensures fast load and is SEO-ready.

---

## 🧐 API Design

I've followed modern REST practices using the Next.js `app/api` structure.

Endpoint:
`GET /api/team_list/{league}?sort_by=name|conference|division`

Responses:

✅ Valid request:

```json
{ "data": [ ...teams ], "description": "Successful operation" }
```

❌ Invalid league:

```json
{ "error": "Please provide a valid league name to fetch team list.", "description": "invalid request" }
```

---

## 🔐 Auth via Middleware

All API routes are protected using middleware that verifies an `x-api-key` in the request header.

- If no api key is provided in headers:

```json
{ "error": "API key is required.", "description": "unauthenticated", "status": 401 }
```

- If the key is invalid:

```json
{ "error": "Invalid API key", "description": "unauthorized", "status": 403 }
```

The middleware avoids Prisma (DB access) directly by internally calling `/api/auth/validate-api-key`, keeping it edge-compatible.

---

## 🖼️ Logos

Currently, placeholder images are used for team logos. I’ve structured the system so it’s easy to replace them with dynamic logo URLs via the database later.
