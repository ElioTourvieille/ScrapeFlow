# ScrapeFlow

ScrapeFlow is a modern web application for creating and managing data scraping workflows. Built with Next.js 15, it provides an intuitive user interface for designing automated workflows.

## Features

- 🎨 Modern and responsive user interface
- 🔄 Visual workflow creation
- 📊 Workflow management (create, edit, delete)
- 🔒 Secure authentication with Clerk
- 🌙 Dark/light mode
- 🎯 Visual flow editor
- 📱 Responsive design

## Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL with Prisma
- **Authentication**: Clerk
- **State Management**: TanStack Query
- **Notifications**: Sonner
- **Workflows**: React Flow

## Prerequisites

- Node.js 18+
- PostgreSQL
- Clerk account

## Installation

1. Clone the repository

```bash
git clone https://github.com/ElioTourvieille/ScrapeFlow.git
cd ScrapeFlow
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
```

4. Initialize the database

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Project Structure

```
scrape-flow/
├── app/                    # Next.js routes and pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main interface
│   └── workflow/          # Workflow editor
├── components/            # Reusable React components
├── lib/                   # Utilities and configurations
├── prisma/               # Prisma schema and migrations
└── public/               # Static assets
```

## License

MIT
