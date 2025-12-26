# Copilot Instructions for JJA-Dash

> **Custom instructions for GitHub Copilot and contributors working on the JJA Intranet Dashboard project.**
> 
> For more details on Copilot customization, visit: https://code.visualstudio.com/docs/copilot/copilot-customization

---

## Project Overview

**JJA-Dash** is an intranet dashboard application designed for internal use. It provides:
- A user-facing dashboard displaying internal tools and applications
- An admin panel for managing dashboard items (add/delete tools)
- Password-protected access with two roles: User (view-only) and Admin (full access)

**Primary Use Case:** Centralized hub for employees to quickly access internal applications and resources.

---

## Technology Stack

This project uses modern web technologies optimized for performance and developer experience:

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router (React Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode enabled)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with PostCSS
- **Storage:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) for cost-efficient data persistence
- **Deployment:** [Vercel](https://vercel.com/) (optimized for Next.js)
- **Runtime:** Node.js 18+ with Turbopack for fast builds

---

## Project Structure

```
jja-dash/
├── .github/                    # GitHub configuration and workflows
│   └── copilot-instructions.md # This file
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── api/                # API Routes (typed with TypeScript)
│   │   │   ├── auth/route.ts   # Authentication endpoint
│   │   │   └── items/route.ts  # Dashboard items CRUD operations
│   │   ├── admin/page.tsx      # Admin panel (protected route)
│   │   ├── login/page.tsx      # Login page
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Main dashboard (protected route)
│   ├── components/             # Reusable React components
│   │   ├── Footer.tsx          # Footer with branding
│   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   └── lib/                    # Shared utilities and types
│       ├── auth.tsx            # Authentication utilities
│       └── types.ts            # TypeScript interfaces and types
├── public/                     # Static assets (images, icons)
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── README.md                   # Project documentation
```

---

## Key Conventions and Patterns

### TypeScript
- **Always use TypeScript** for all new files (`.ts`, `.tsx`)
- Prefer `interface` over `type` for object shapes (consistency)
- Export types from `src/lib/types.ts` for shared interfaces
- Enable strict type checking (already configured in `tsconfig.json`)
- Use `@/` path alias for imports (e.g., `import { Item } from '@/lib/types'`)

### API Routes
- Use **typed Next.js Route Handlers** (Next.js 13+ App Router style)
- Always return `NextResponse.json()` for consistent API responses
- Include proper error handling with appropriate HTTP status codes
- Validate request bodies and return 400 errors for invalid inputs
- Example pattern:
  ```typescript
  export async function POST(request: NextRequest) {
    const body = await request.json();
    // Validate body
    if (!body.requiredField) {
      return NextResponse.json({ error: 'Missing required field' }, { status: 400 });
    }
    // Process request
    return NextResponse.json({ success: true });
  }
  ```

### React Components
- Use **React Server Components** by default (App Router convention)
- Add `'use client'` directive only when needed (state, effects, browser APIs)
- Prefer functional components with TypeScript props interfaces
- Keep components focused and single-responsibility

### Styling
- Use **Tailwind CSS utility classes** (no custom CSS files unless necessary)
- Follow mobile-first responsive design principles
- Use semantic color names from Tailwind's palette
- Keep consistent spacing scale (use Tailwind's spacing units)

### Data Storage
- Store data in **Vercel Blob** using the `@vercel/blob` SDK
- Use `items.json` as the blob key for dashboard items
- Always handle blob fetch errors gracefully (return empty array as fallback)

### Authentication
- Passwords are stored in **server-side environment variables only**
- Never expose credentials to client-side code
- Use `localStorage` for client-side session persistence (auth state)
- Authentication state is managed via API endpoints

---

## Setup and Customization Checklist

For new developers setting up the project, follow these steps:

- [ ] **Clone the repository** and navigate to project directory
  ```bash
  git clone <repository-url>
  cd jja-dash
  ```

- [ ] **Install dependencies** (Node.js 18+ required)
  ```bash
  npm install
  ```

- [ ] **Configure environment variables** (create `.env.local`)
  ```env
  # Required: Vercel Blob token for data storage
  BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
  
  # Required: Authentication passwords (server-side only)
  USER_PASSWORD=your_user_password_here
  ADMIN_PASSWORD=your_admin_password_here
  
  # Optional: Branding customization
  NEXT_PUBLIC_COMPANY_NAME=Joseph Jacobs & Associates
  NEXT_PUBLIC_COMPANY_SHORT_CODE=JJA
  NEXT_PUBLIC_SUPPORT_EMAIL=admin@josephjacobs.org
  ```
  
  > **Get a Vercel Blob token:** Visit [Vercel Dashboard](https://vercel.com/dashboard) → Project Settings → Storage → Blob → Create/Copy Token

- [ ] **Run the development server**
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000)

- [ ] **Test authentication** with configured passwords

- [ ] **Build for production** to verify everything works
  ```bash
  npm run build
  ```

- [ ] **Review README.md** for detailed feature documentation

---

## Development Workflow Best Practices

### Code Contributions

**DO:**
- ✅ Use TypeScript for all new files
- ✅ Follow existing code formatting and style conventions
- ✅ Write descriptive commit messages
- ✅ Test changes locally before committing (`npm run dev`, `npm run build`)
- ✅ Run linter before committing: `npm run lint`
- ✅ Use semantic HTML and accessible components
- ✅ Handle errors gracefully (API endpoints, blob storage, authentication)
- ✅ Keep components small and focused
- ✅ Add proper TypeScript types for props and return values
- ✅ Use Server Components by default, Client Components when necessary

**DON'T:**
- ❌ Commit `.env.local` or any files with secrets
- ❌ Use plain JavaScript (`.js`, `.jsx`) for new files
- ❌ Add custom CSS files without justification (prefer Tailwind)
- ❌ Expose authentication credentials to client-side code
- ❌ Skip error handling in API routes or async operations
- ❌ Ignore TypeScript errors (fix or explicitly suppress with justification)
- ❌ Break existing functionality without updating tests/documentation

### Linting and Building

- **Lint your code:** `npm run lint`
- **Build for production:** `npm run build`
- **Start production server:** `npm start` (after building)

Use **Turbopack** for faster builds (already configured in scripts).

---

## Documentation and Version Updates

### 📝 IMPORTANT: Always Update Documentation

When making changes to the codebase, **you must update relevant documentation**:

- **README.md** — Update if you add features, change setup steps, or modify environment variables
- **CHANGELOG** — Document all meaningful changes (if CHANGELOG exists in the project)
- **This file (copilot-instructions.md)** — Update if you change conventions, structure, or workflows
- **Inline code comments** — Add JSDoc comments for complex functions or non-obvious logic

### 📌 Version Number Updates

Update version numbers in `package.json` when making meaningful changes:

- **Patch (0.1.X):** Bug fixes, minor improvements, documentation updates
- **Minor (0.X.0):** New features, significant enhancements
- **Major (X.0.0):** Breaking changes, major rewrites

**Example:**
```bash
# Update version and commit
npm version patch -m "Bump version to %s: Fixed authentication bug"
```

---

## Deployment

### Vercel Deployment

The application is designed to deploy seamlessly on **Vercel**:

1. **Push code to GitHub** (this repository)
2. **Connect repository to Vercel** (import project in Vercel dashboard)
3. **Add environment variables** in Vercel project settings:
   - `BLOB_READ_WRITE_TOKEN`
   - `USER_PASSWORD`
   - `ADMIN_PASSWORD`
   - Branding variables (`NEXT_PUBLIC_*`)
4. **Deploy** — Vercel will automatically build and deploy on push

**Auto-deploy on push:** Vercel automatically deploys on every push to main branch.

---

## Security Considerations

- **Never commit secrets** — Use `.env.local` for local development
- **Server-side only variables** — Prefix with `NEXT_PUBLIC_` only when needed client-side
- **Authentication** — Passwords are validated server-side via API routes
- **Blob storage** — Use `public` access with non-sensitive data only

---

## Troubleshooting

**Common Issues:**

1. **Blob storage errors:** Verify `BLOB_READ_WRITE_TOKEN` is set correctly in `.env.local`
2. **Build failures:** Run `npm install` to ensure dependencies are up-to-date
3. **TypeScript errors:** Check `tsconfig.json` and ensure all types are properly defined
4. **Authentication not working:** Verify `USER_PASSWORD` and `ADMIN_PASSWORD` are set in environment

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [GitHub Copilot Customization Guide](https://code.visualstudio.com/docs/copilot/copilot-customization)

---

## Summary for Copilot

When generating code suggestions for this project:
- Prioritize **TypeScript** with strict typing
- Use **Next.js 15 App Router** conventions (Server Components, Route Handlers)
- Style with **Tailwind CSS** utility classes
- Follow existing patterns in `src/app/api/` for API routes
- Maintain consistency with authentication and blob storage patterns
- Always include error handling and input validation
- Update documentation when suggesting new features or changes