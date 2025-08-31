# Loan Management System

A modern loan management dashboard for brokers and loan officers, featuring AI-powered risk assessment and intuitive workflow management.

## 🌐 Live Demo

**Website:** https://loanms.vercel.app/  
**Repository:** https://github.com/YahampathChandika/Loan-Management-System

## 🚀 Features

### Borrower Pipeline Management
- Three-stage loan workflow: New, In Review, Approved
- Real-time search and filtering across borrowers
- Active/Inactive status management
- Interactive card-based interface

### AI-Powered Risk Assessment
- Automated detection of potential loan risks
- Explainable AI recommendations with detailed reasoning
- Visual risk indicators and warnings
- Conditional approval workflow based on AI flags

### Broker Dashboard
- Performance metrics and statistics
- Onboarding workflow progress tracking
- Multi-channel communication options
- AI assistant integration

### Modern UI/UX
- Dark and light theme support
- Fully responsive design for all devices
- Professional enterprise-grade interface
- Smooth animations and transitions

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **State Management:** Zustand
- **Icons:** Lucide React
- **Testing:** Playwright
- **Deployment:** Vercel

## 📦 Installation

```bash
git clone https://github.com/YahampathChandika/Loan-Management-System.git
cd Loan-Management-System
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── borrower/         # Borrower management
│   ├── broker/           # Broker dashboard
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and types
├── store/                # State management
├── tests/                # E2E tests
└── data/                 # Mock data
```

## 🎯 Core Functionality

### Borrower Management
- View borrowers across different pipeline stages
- Search and filter by name, loan type, or status
- Click to view detailed borrower information
- Track loan amounts and status changes

### Risk Assessment
- AI-powered detection of income inconsistencies
- Debt-to-income ratio calculations
- Credit score evaluation and warnings
- Source of funds verification

### Workflow Actions
- Request additional documents
- Send applications to valuers
- Approve loans based on criteria
- Escalate to credit committee when needed

### Broker Tools
- Track deals, approval rates, and pending amounts
- Monitor onboarding workflow progress
- Contact borrowers via call, email, or chat
- Toggle AI assistant features

## 📱 Responsive Design

The application provides an optimal experience across all devices:

- **Desktop:** Three-column layout with full feature access
- **Tablet:** Adaptive layout with reorganized panels
- **Mobile:** Single-column stack with touch-optimized controls

## 🧪 Testing

```bash
# Install test dependencies
npx playwright install

# Run tests
npm run test

# Run with UI
npm run test:ui

# Debug tests
npm run test:debug
```

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Build Commands
```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Code linting
```

### Customization
The application uses a design system built with CSS variables that can be customized in `app/globals.css` for different branding requirements.

## 📊 API Endpoints

The application includes a complete API layer:

- `GET /api/borrowers/pipeline` - Borrower pipeline data
- `GET /api/borrowers/[id]` - Individual borrower details
- `POST /api/borrowers/[id]/approve` - Approve loan
- `POST /api/borrowers/[id]/escalate` - Escalate to credit committee
- `POST /api/borrowers/[id]/request-documents` - Request documents
- `POST /api/borrowers/[id]/send-valuer` - Send to valuer
- `GET /api/broker/[id]` - Broker information
- `GET /api/onboarding/workflow` - Workflow steps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is for demonstration purposes.

---

Built with ❤️ using modern web technologies for efficient loan management.
