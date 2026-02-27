# Shree Naulin Secondary School

## Current State
New project with no existing code.

## Requested Changes (Diff)

### Add
- Full landing page website for Shree Naulin Secondary School
- Navigation bar with sections: About Us, Academics, Admissions, Contact (smooth scroll anchors)
- Hero section with high-res Himalayan school campus image and CTA
- Latest News section (grid of news cards with date, title, short description)
- Message from the Principal block (photo, name, title, quote/message)
- School Facilities grid (icons + names + short descriptions for each facility)
- About Us section with school overview text
- Admissions section with key info and CTA
- Contact section with address, phone, email, and simple contact form
- Footer with school name, quick links, social icons

### Modify
- None

### Remove
- None

## Implementation Plan
1. Backend: Store latest news articles and facilities data as stable Motoko records
2. Frontend:
   - Navbar (fixed, navy blue, gold accent, logo/school name, mobile hamburger menu)
   - Hero section (full-viewport background image, overlay text, CTA button)
   - About Us section
   - Latest News section (card grid fetched from backend)
   - Message from the Principal (card with portrait, name, message)
   - Facilities grid (icon cards fetched from backend)
   - Admissions section
   - Contact section + form
   - Footer
3. Color palette: navy blue (#1a2b5e), white (#ffffff), gold (#c9a52c)
4. Typography: clean sans-serif, modern hierarchy
5. Mobile-responsive layout using Tailwind CSS
6. High-quality Lucide icons for facilities
