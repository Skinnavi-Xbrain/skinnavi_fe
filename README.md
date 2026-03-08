<div align="center">

# 🚀 SkinNavi Frontend

**Onboarding Guide** – Easy setup for new team members

</div>

---

## 🧱 Tech Stack

| Technology       | Usage                        |
| ---------------- | ---------------------------- |
| **React**        | Frontend library             |
| **TypeScript**   | Static typing for JavaScript |
| **Vite**         | Fast build tool & dev server |
| **Shadcn**       | UI component library         |
| **Tailwind CSS** | Utility-first CSS framework  |

---

## ✅ Prerequisites

Make sure you have installed:

- **Node.js** `v18+` (recommended)
- **Git**

Check versions (optional):

```bash
node -v
git -v
```

---

## 📥 Clone the Repository

```bash
git clone https://github.com/KaPhuDong/skinnavi-frontend.git
cd skinnavi-frontend
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Update values if needed.

> ⚠️ **Do NOT commit `.env` files**

### 🧩 Local mock API server

Instead of modifying the frontend code, a small Node process can mimic the backend.

1. Start the server with the provided npm script:

   ```bash
   npm run mock
   # -> Mock API listening on http://localhost:3001
   ```

   This runs `mock-server/index.js` and exposes:
   - `/api/routines` – morning/evening routine steps with sub-steps
   - `/api/routines/steps/:stepId` – detailed step with sub-steps
   - `/api/routine-daily-logs` – daily routine completion history
   - `/api/skin-analysis/comparison` – skin metrics comparison (current vs previous)

   Feel free to edit or expand the response to exercise different UI states.
   Each `sub_step` contains a `description` field with detailed guidance;
   the `instruction` property remains a concise title.

2. Point the frontend at the mock by adjusting your `.env`:

   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

   (Keep the `/api` suffix; `api-client.ts` appends route paths.)

3. Run the dev server (`npm run dev`) as usual. No changes are required in the
   service files or components; they still call `apiClient.get('/routines')`.

4. To hit the real backend again, revert `VITE_API_URL` to the production/remote
   address and stop the mock process.

This setup isolates the mock implementation from your source code and makes it easy
to switch back and forth simply by changing an environment variable.

---

## ▶️ Start the Frontend Server

```bash
npm run dev
```

The API will be available at:

👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 Common Commands

```bash
npm run dev        # Start frontend in development mode
npm run build      # Build production version
npm run preview    # Preview production build
npm run lint       # Run ESLint (if configured)
```

---

<div align="center">

✨ Happy Coding with **SkinNavi** ✨

</div>
