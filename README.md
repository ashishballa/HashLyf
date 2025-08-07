# Whitehorse Financial - Life Insurance Website

A modern, professional website for a life insurance agent built with Next.js, Tailwind CSS, and Supabase.

## Features

- **Responsive Design**: Mobile-first design that looks great on all devices
- **Contact Form**: Integrated with Supabase for lead management
- **Professional Layout**: Conversion-focused design for insurance services
- **SEO Optimized**: Proper meta tags and structure for search engines
- **Admin Panel**: View and manage contact form submissions

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your keys
3. Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Create Database Tables

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  insurance_type TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new'
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin select" ON contact_submissions
  FOR SELECT USING (true);
```

### 4. Customize Your Information

Update the following with your actual details:
- Phone numbers in `components/Header.js` and `components/Contact.js`
- Email addresses throughout the site
- Your actual name and credentials
- Service area (currently set to Ontario)  
- Business hours in `components/Contact.js`

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your website.

### 6. Deploy

The easiest way to deploy is with Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## File Structure

```
LLQP/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Main homepage
│   └── globals.css        # Global styles and Tailwind
├── components/
│   ├── Header.js          # Navigation header
│   ├── Hero.js            # Hero section
│   ├── Services.js        # Services section
│   ├── About.js           # About section
│   ├── Testimonials.js    # Testimonials section
│   ├── Contact.js         # Contact form
│   └── Footer.js          # Footer
├── lib/
│   └── supabase.js        # Supabase client configuration
├── pages/
│   └── admin.js           # Admin panel for submissions
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── next.config.js         # Next.js configuration
└── .env.local            # Environment variables
```

## Customization Tips

### Adding Your Photo
Replace the placeholder content in the About section with your professional photo.

### Updating Services
Modify the `services` array in `components/Services.js` to match your specific offerings.

### Changing Colors
Update the color scheme in `tailwind.config.js` to match your brand colors.

### Adding More Pages
Create new pages in the `app` directory for additional content like:
- `/app/blog/page.js` for a blog
- `/app/services/[service]/page.js` for detailed service pages
- `/app/calculator/page.js` for insurance calculators

## Admin Panel

Access the admin panel at `/admin` to view contact form submissions. You can update the status of leads and track your pipeline.

## SEO and Marketing

The website includes:
- Proper meta tags for search engines
- Schema markup for local business
- Fast loading times with Next.js optimization
- Mobile-responsive design
- Contact forms to capture leads

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Schema

The Supabase database uses the following table structure:

### contact_submissions
- `id` (BIGSERIAL) - Primary key
- `name` (TEXT) - Contact's full name
- `email` (TEXT) - Contact's email address
- `phone` (TEXT) - Contact's phone number (optional)
- `insurance_type` (TEXT) - Type of insurance they're interested in
- `message` (TEXT) - Their message/inquiry
- `created_at` (TIMESTAMP) - When the submission was created
- `status` (TEXT) - Status of the lead (new, contacted, completed)

## Support

For technical support or customization help, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## Important Notes

- Update `.env.local` with your actual Supabase credentials before running
- The contact form requires Supabase to be properly configured
- Remember to customize all contact information and business details
- The admin panel is unsecured - add authentication for production use

Good luck with your insurance business! 🎯