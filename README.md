# WISEDELL ACADEMY Website

A modern, responsive website for WISEDELL ACADEMY, a premier private day secondary school in Masvingo, Zimbabwe. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Core Pages**: Home, About Us, Academics, Teachers, Admissions, Student Life, News & Events, Gallery, Contact
- **Admin Dashboard**: Comprehensive admin panel for managing content
- **SEO Optimized**: Meta tags and structured data for search engines
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized images and lazy loading
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (to be configured)
- **Authentication**: Supabase Auth (to be configured)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wisdell-academy
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
wisdell-academy/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── about/              # About Us page
│   │   ├── academics/          # Academics page
│   │   ├── admissions/         # Admissions page
│   │   ├── admin/              # Admin dashboard
│   │   ├── contact/            # Contact page
│   │   ├── gallery/            # Gallery page
│   │   ├── news-events/        # News & Events page
│   │   ├── student-life/       # Student Life page
│   │   ├── teachers/           # Teachers page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── about/              # About page components
│   │   ├── academics/          # Academics components
│   │   ├── admissions/         # Admissions components
│   │   ├── admin/              # Admin components
│   │   ├── contact/            # Contact components
│   │   ├── gallery/            # Gallery components
│   │   ├── home/               # Home page components
│   │   ├── news-events/        # News & Events components
│   │   ├── student-life/       # Student Life components
│   │   ├── teachers/           # Teachers components
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Header.tsx          # Header component
│   │   └── theme-provider.tsx  # Theme provider
│   └── lib/                    # Utility functions
│       ├── supabase.ts         # Supabase client
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🎨 Pages

### Public Pages
- **Home**: Hero section, statistics, features, CTA, news, events, testimonials, gallery preview
- **About Us**: History, mission, vision, core values, leadership, timeline
- **Academics**: O Level and A Level subjects
- **Teachers**: Teacher profiles and qualifications
- **Admissions**: Requirements, fees, online application form
- **Student Life**: Clubs, sports, activities
- **News & Events**: Latest news and upcoming events
- **Gallery**: Photo gallery with lightbox
- **Contact**: Contact form, map, WhatsApp integration

### Admin Pages
- **Dashboard**: Overview with statistics and quick actions
- **Applications**: Manage student applications
- **Teachers**: Manage teacher profiles
- **News & Events**: Manage news articles and events
- **Gallery**: Manage gallery images
- **Downloads**: Manage downloadable resources
- **Users**: Manage user accounts
- **Settings**: Site configuration

## 🔐 Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `src/lib/supabase.ts` to create tables
3. Copy your project URL and anon key to `.env.local`
4. Enable authentication in Supabase dashboard

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

- [ ] Complete Supabase integration
- [ ] Implement authentication
- [ ] Add real-time updates
- [ ] Implement file uploads
- [ ] Add email notifications
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data
- [ ] Add PWA support
- [ ] Implement caching strategies

## 📄 License

This project is proprietary software for WISEDELL ACADEMY.

## 👥 Contact

For support, contact: info@wisdellacademy.co.zw

---

**WISEDELL ACADEMY** - With God We Work Hard and Shine
