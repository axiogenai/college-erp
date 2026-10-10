# Chanakya ERP — Enterprise SIS 2.0

> **Next-Generation Collegiate Enterprise Resource Planning & Student Information System**  
> Designed with collegiate institutional aesthetics, deterministic state management, real-time analytics, and role-based access control.

---

## 🏛️ Overview

**Chanakya ERP** is an institutional academic management platform tailored for modern universities, colleges, and educational conglomerates. It provides unified governance over student registries, faculty workloads, financial ledgers, examinations, compliance, and academic risk detection.

---

## ✨ Key Features

- **Role-Based Portals**:
  - **Executive Directorate (Principal)**: Global KPIs, institutional health, approval workflows, risk radar.
  - **Faculty & Academic Staff**: Course delivery, class registers, gradebook entry, workload monitoring.
  - **Accountant & Treasury**: Fee collections, receipt generation, aging ledgers, ledger reconciliation.
  - **Student**: Academic transcripts, fee receipts, timetable, circulars.
- **Enterprise Modules**:
  - 📊 **Executive Dashboard**: Directorate KPIs, real-time admissions pipeline, financial metrics.
  - 🎓 **Student Registry**: Filterable scholar database with academic standing and fee status chips.
  - 👥 **Faculty & Workload**: Departmental allocation, research credentials, teaching load balances.
  - 📅 **Timetable & Scheduling**: Conflict-free classroom and lecture hall management.
  - ⏱️ **Attendance Manager**: Daily session registers with auto-aggregated percentages.
  - 🏆 **Exams & Gradebook**: Mid-semester, final exams, credit grading, and mark sheets.
  - 💳 **Treasury & Fee Ledger**: Invoice status tracking and instant printable fee receipts.
  - 🤖 **Policy Assistant (AI)**: Instant natural language queries on institutional bylaws and UGC guidelines.
  - ⚠️ **Academic Risk Radar**: Multi-factor early warning indicators for attendance or CGPA risk.
  - 🛡️ **Audit Trail & Governance**: Tamper-evident ledger logs and subsystem verification.
  - ⚡ **System Health & DevOps**: Real-time service uptime, database latency, and automated backup logs.
- **Modern UI & Interaction Design**:
  - Collegiate institutional palette with dark mode support.
  - Sleek active navigation items with vertical accent indicator pills.
  - Responsive layout with collapsible sidebar and mobile drawer navigation.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/axiogenai/college-erp.git

# Navigate into the project directory
cd college-erp

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🧪 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with hot module replacement |
| `npm run build` | Compiles TypeScript and builds optimized production bundle |
| `npm run preview` | Locally previews production build |
| `npm run test` | Runs test suite via Vitest |

---

## 📁 Directory Structure

```text
college-erp/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── common/         # Atomic UI components (Buttons, Selects, StatCards, Modals)
│   │   ├── dashboards/     # Role-specific executive dashboards
│   │   ├── layout/         # AppLayout, Sidebar, TopNavbar
│   │   ├── modules/        # Domain modules (Students, Faculty, Finance, Risk Radar, etc.)
│   │   └── public/         # Public admissions portal
│   ├── context/            # Global state (AuthContext, ErpDataContext, ThemeContext)
│   ├── data/               # Deterministic seed data and mock registries
│   ├── tests/              # Automated unit and integration test suites
│   ├── types/              # Comprehensive TypeScript interfaces & types
│   ├── App.tsx             # Root routing and role orchestration
│   ├── index.css           # Base styles and theme configuration
│   └── main.tsx            # Application entry point
├── .gitattributes          # Git LF normalization
├── .gitignore              # Ignored build and dependency artifacts
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Custom theme and institutional palette
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 📄 License

MIT License. Designed and maintained for institutional academic excellence.
