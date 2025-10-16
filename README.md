# Intranet Dashboard

A modern intranet dashboard for quick access to internal apps and tools, built with Next.js and hosted on Vercel using Blob storage for cost-efficient data management.

## Features

- **Dashboard**: Clean, modern interface displaying internal tools with title, subtitle, link, and image/icon
- **Admin Panel**: Add and delete dashboard items
- **Vercel Blob Storage**: Cost-efficient storage for dashboard data
- **Responsive Design**: Works on desktop and mobile devices

## Branding

Customize the dashboard with your company branding using environment variables:

- `NEXT_PUBLIC_COMPANY_NAME`: Replaces "Intranet Dashboard" with "[Company Name] Dashboard"
- `NEXT_PUBLIC_COMPANY_SHORT_CODE`: Used in the copyright footer (e.g., "JJA")
- `NEXT_PUBLIC_SUPPORT_EMAIL`: Email address for the "Contact Support" link

Copy `.env.example` to `.env.local` and customize these values for your organization.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jja-dash
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Vercel Blob token and branding configuration:
```env
# Required for functionality
BLOB_READ_WRITE_TOKEN=your_blob_token_here

# Branding (optional - defaults will be used if not set)
NEXT_PUBLIC_COMPANY_NAME=Joseph Jacobs & Associates
NEXT_PUBLIC_COMPANY_SHORT_CODE=JJA
NEXT_PUBLIC_SUPPORT_EMAIL=admin@josephjacobs.org
```

To get a Vercel Blob token:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project settings
3. Go to Storage > Blob
4. Create a new Blob store if needed
5. Copy the read-write token

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Building

Build for production:
```bash
npm run build
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `BLOB_READ_WRITE_TOKEN` environment variable in Vercel dashboard
4. Deploy

The app will be available at your Vercel domain.

## Usage

### Dashboard
- Visit the root URL to see all available tools
- Click "Access" on any item to open the tool in a new tab

### Admin Panel
- Visit `/admin` to manage dashboard items
- Add new items with title, subtitle, link, and optional image URL
- Delete existing items

## Project Structure

```
src/
├── app/
│   ├── api/items/route.ts    # API endpoints for CRUD operations
│   ├── admin/page.tsx        # Admin panel
│   └── page.tsx              # Main dashboard
└── lib/
    └── types.ts              # TypeScript interfaces
```

## API Endpoints

- `GET /api/items` - Retrieve all dashboard items
- `POST /api/items` - Add a new item
- `DELETE /api/items` - Delete an item by ID

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and intended for internal use only.
