# Loan Management System

A modern loan management dashboard for brokers and loan officers, featuring AI-powered risk assessment and responsive design.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
git clone https://github.com/YahampathChandika/Loan-Management-System.git
cd Loan-Management-System
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Features

### Borrower Pipeline
- Three-stage workflow: New, In Review, Approved
- Real-time search and filtering
- Responsive card interface

### AI Risk Assessment
- Automated flag detection for loan applications
- Explainable AI recommendations
- Smart approval workflow

### Broker Dashboard
- Performance metrics and statistics
- Onboarding workflow tracking
- Multi-channel contact options

### User Experience
- Dark/Light theme support
- Responsive design for all devices
- Toast notifications
- Professional UI components

## 🛠️ Technology Stack

- **Frontend:** React 19, Next.js 15
- **Styling:** Tailwind CSS, ShadCN UI
- **State Management:** Zustand
- **Type Safety:** TypeScript
- **Testing:** Playwright
- **Icons:** Lucide React

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   └── dashboard/         # Main dashboard
├── components/            # React components
│   ├── borrower/         # Borrower components
│   ├── broker/           # Broker components
│   └── ui/               # UI components
├── lib/                  # Utilities and types
├── store/                # State management
└── tests/                # E2E tests
```

## 🧪 Testing

```bash
# Install test dependencies
npx playwright install

# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

## 🔧 API Endpoints

The application includes a complete API layer with the following endpoints:

- `GET /api/borrowers/pipeline` - Get borrower pipeline data
- `GET /api/borrowers/[id]` - Get borrower details
- `POST /api/borrowers/[id]/approve` - Approve loan
- `POST /api/borrowers/[id]/escalate` - Escalate to credit committee
- `POST /api/borrowers/[id]/request-documents` - Request documents
- `POST /api/borrowers/[id]/send-valuer` - Send to valuer
- `GET /api/broker/[id]` - Get broker information
- `GET /api/onboarding/workflow` - Get workflow steps

## 🎨 Design Features

- Modern, clean interface
- Consistent spacing and typography
- Color-coded status indicators
- Smooth animations and transitions
- Mobile-first responsive design

## 📝 Usage

1. **View Pipeline:** Browse borrowers across different stages
2. **Select Borrower:** Click any borrower card to view details
3. **Review AI Flags:** Expand AI Explainability section for risk assessment
4. **Take Actions:** Approve loans, request documents, or escalate cases
5. **Monitor Progress:** Track workflow progress in broker overview

## 🔗 Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📄 License

This project is developed for demonstration purposes.

## 🤝 Contributing

This is a demonstration project. For suggestions or improvements, feel free to open an issue.
