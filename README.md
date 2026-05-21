# PetBuddy

PetBuddy is a pet adoption platform built with Next.js, Better Auth, and MongoDB. It helps users browse pets, view details, send adoption requests, and manage pet listings through a dashboard experience.

## Purpose

The purpose of this project is to create a clean, recruiter-friendly pet adoption portal where users can explore available pets, submit adoption requests, and manage their own listings and requests.

## Live URL

`https://assignment-09-phi.vercel.app/`

## Features

- Responsive home page with hero section and multiple sections
- Featured pets section with dynamic pet cards
- All Pets page with search, species filter, sorting, and clear filters
- Pet details page with adoption modal
- Authentication with sign up, sign in, sign out, and protected dashboard routes
- Dashboard layout with My Requests, Add Pet, and My Listings
- Custom loading page and 404 page
- User profile display in the navbar when signed in

## NPM Packages Used

- `next`
- `react`
- `react-dom`
- `better-auth`
- `mongodb`
- `react-icons`
- `daisyui`
- `tailwindcss`
- `eslint`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with these values:

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

## Notes

- No default `alert()` is used for user messages.
- The project is designed to be responsive on mobile, tablet, and desktop.
- Dashboard routes are protected with a client-side session guard.

