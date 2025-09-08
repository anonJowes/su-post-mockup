# SUpost Marketplace

A modern, responsive community marketplace website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first design with hamburger menu and responsive grid
- **Search & Filters**: Live search with category, price, and location filters
- **Listing Cards**: Display with image, title, description, price, rating, and verification badge
- **User Registration**: Email verification and optional phone verification
- **Animations**: Hover animations on cards and buttons using Framer Motion
- **Mock Backend**: JSON Server for dummy data

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theme colors
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Mock API**: JSON Server

## Color Theme

- Primary: #0b3574
- Secondary: #9a2024
- Neutral: #abb2bc

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the mock backend**:
   ```bash
   npm run json-server
   ```
   This will start JSON Server on http://localhost:3001

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with listings grid
│   ├── categories/
│   │   └── page.tsx        # Categories page
│   ├── search/
│   │   └── page.tsx        # Search page with filters
│   ├── post/
│   │   └── page.tsx        # Post new listing page
│   └── profile/
│       └── page.tsx        # User registration/profile page
├── components/
│   ├── NavBar.tsx          # Top navigation bar
│   ├── ListingCard.tsx     # Individual listing card
│   └── SearchBar.tsx       # Search with filters
├── lib/
│   └── data.ts             # Sample data and types
└── app/
    ├── globals.css         # Global styles and Tailwind
    └── layout.tsx
```

## Pages

- **/**: Homepage displaying all listings in a responsive grid
- **/categories**: Browse listings by category
- **/search**: Advanced search with filters
- **/post**: Create new listing form
- **/profile**: User registration and profile

## Components

- **NavBar**: Responsive navigation with mobile hamburger menu
- **ListingCard**: Animated card displaying listing details
- **SearchBar**: Search input with expandable filters

## Mock Data

Sample listings and users are provided in `src/lib/data.ts` and `db.json` for JSON Server.

## Development

- Uses TypeScript for type safety
- Tailwind CSS for styling with custom color palette
- Framer Motion for smooth animations
- Responsive design that works on all devices
- Clean, modern UI following the specified theme

## Security Notes

This is a demo project with mock authentication. In a production environment, implement proper:
- User authentication and authorization
- Input validation and sanitization
- Secure API endpoints
- Data encryption
- Rate limiting

## License

This project is for demonstration purposes.
