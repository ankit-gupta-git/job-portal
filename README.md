# Job Portal

A modern job portal built with React, Supabase, and Clerk, designed to connect recruiters with job seekers. This platform allows recruiters to post job openings while enabling job seekers to discover and apply for relevant positions.

## Features

- **User Authentication & Authorization**
  - Secure authentication using Clerk
  - Role-based access control (Recruiter/Job Seeker)
  - Email/Password and Social Logins

- **For Recruiters**
  - Create and manage job postings
  - View and manage applications
  - Company profile management

- **For Job Seekers**
  - Browse and search job listings
  - Apply to jobs with resume upload
  - Save favorite job postings
  - Track application status

- **Modern UI/UX**
  - Built with shadcn/ui components
  - Responsive design for all devices
  - Intuitive navigation and user flows

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Authentication**: Clerk
- **Backend & Database**: Supabase with PostgreSQL
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Supabase account
- Clerk account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/job-portal.git
   cd job-portal
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory and add:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

## Project Structure

```
job-portal/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── lib/         # Utility functions and configurations
│   ├── hooks/       # Custom React hooks
│   ├── types/       # TypeScript type definitions
│   ├── styles/      # Global styles
│   └── App.tsx      # Main application component
├── .env.example     # Example environment variables
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tooling
- [Supabase](https://supabase.com/) for the backend services
- [Clerk](https://clerk.com/) for authentication
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
