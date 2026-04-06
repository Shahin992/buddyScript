# 🚀 BuddyScript - Premium Social Media Experience

BuddyScript is a state-of-the-art social media feed application built for the **Appifylab Full-Stack Engineer Selection Task**. It features a modern, reactive interface with deep nested commentary, persistent interaction states, and production-grade architecture.

---

## ✨ Core Features

### 📡 Interactive Feed
- **Seamless Posting**: Create text-based posts with multiple image support via Cloudinary.
- **Infinite Feed**: Integrated with backend cursor-based pagination for smooth scrolling performance.
- **Privacy First**: Fine-grained post privacy controls (Public/Private).

### 💬 Advanced Engagement
- **Deep Nested Comments**: Support for comments and replies with infinite nesting capability.
- **Persistent Reactions**: Robust "Liked" state calculation on the backend ensures your reactions stay persistent even after full page reloads.
- **Interaction Transparency**: View a detailed "Liked By" list for any post or comment via elegant modal overlays.

### 🎨 Premium UI/UX
- **Modern Aesthetics**: Built with a "wow-factor" design incorporating Glassmorphism, smooth micro-animations, and vibrant color palettes.
- **Optimistic Updates**: Immediate UI feedback for likes and comments with background server synchronization.

---

## 🛠️ Technical Stack

- **Frontend Core**: React 18 + Vite (TypeScript)
- **State Management**: Redux Toolkit (Optimistic UI patterns)
- **Routing**: Centralized Layout-based routing with Authentication Guards.
- **Styling**: Tailored Custom CSS + Material UI (MUI) components.
- **API Communication**: Unified Axios-based `httpRequest` service with interceptors.
- **Media Management**: Cloudinary API for high-performance image hosting.

---

## 🧠 Architectural Decisions

### 1. Production-Grade Routing
We transitioned from a basic routing setup to a **Centralized Configuration Model**. 
- **Layout-Driven Design**: The `MainLayout` component centralizes the Navbar and Sidebars, ensuring brand consistency across all private routes.
- **Route Guards**: `PrivateRoute` and `GuestRoute` components safely manage session visibility.
- **Lazy Loading**: Integrated `React.lazy` and `Suspense` for all pages to dramatically reduce bundle sizes.

### 2. Reliable Interaction Data
Unlike traditional feeds that reset "liked" states on refresh, BuddyScript calculates the `isLiked` boolean on the server-side during feed retrieval. This eliminates data flickering and provides a truly persistent social experience.

### 3. State Single-Source-of-Truth
Used Redux Toolkit slices to manage the complex interplay between posts, nested comments, and their respective reply threads, ensuring state consistency across the entire UI tree.

---

## 📁 Project Structure

```bash
src/
├── components/      # UI Components (Feed, Auth, Common)
├── layouts/         # Nested Route Layouts (MainLayout, AuthLayout)
├── pages/           # Page-level components (Lazy loaded)
├── routes/          # Centralized route configuration
├── services/        # API service layers
├── store/           # Redux Toolkit slices and configuration
└── styles/          # Design tokens and custom CSS
```

---

## 🚀 Getting Started

1. **Environment Configuration**:
   Create a `.env` in the root and add:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_COOKIE_NAME=buddy_script_token
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## 📝 Author
Developed as part of the **Appifylab Selection Task**.
