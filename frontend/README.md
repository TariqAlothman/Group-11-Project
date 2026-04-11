# CookSmart - Interactive Recipe Platform 🍲

**CookSmart** is a dynamic, multi-role web application designed to connect home cooks with professional chefs. Built with modern web technologies, the platform provides an interactive recipe discovery flow, an engaging step-by-step cooking experience, and robust moderation tools for platform administrators.

---

## 🌟 Key Features

We have built a comprehensive set of frontend interfaces tailored to three distinct user roles:

### 1. General User Experience
- **Recipe Discovery**: Browse and filter recipes using dynamic search and category filtering.
- **Interactive Cooking Mode**: A hands-free, step-by-step interactive view for active cooking with progress tracking and pro-tips.
- **Personalization**: Manage saved recipes in **Favorites**, dynamically track ingredients in the **Shopping List**, and review past meals in the **Cooking History**.
- **User Dashboard**: A personalized hub showing recent activity, streak tracking, and quick actions.
- **Profile Settings**: A comprehensive pane managing user preferences, personal details, and account metrics.

### 2. Chef Experience
- **Chef Dashboard**: A dedicated portal to track recipe performance, follower engagement, and submission progress.
- **Recipe Creation**: A detailed multi-step form to upload recipes, tag ingredients, and write instructions.
- **Submission Status**: Allows chefs to track their draft, pending, approved, and rejected recipes in real time.

### 3. Administrator Experience
- **Admin Dashboard**: Sitewide telemetry and high-level statistics tracking user signups and platform health.
- **Review Queue**: An approval pipeline for administrators to systematically approve, reject, or request revisions on pending Chef recipes.
- **Manage Users & Categories**: Robust administrative capabilities for suspending problematic users and organizing global meal types.

### 4. Core System & Routing
- **Authentication**: Complete UI flows for Login, Signup, Forgot Password, and Reset Password.
- **Error Handling**: Beautifully crafted fallback pages including comprehensive `404 Not Found`, `403 Forbidden`, and `500 Server Error` screens.
- **Role-Based Navigation**: A dynamic, state-aware Navbar that seamlessly morphs navigation capabilities depending on whether the user is a standard User, a Chef, or an Administrator.

---

## 🛠 Tech Stack

- **Frontend Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **Styling:** Custom Vanilla CSS tailored to modern design systems without reliance on heavy UI frameworks.

---

## ⚙️ Installation Instructions

To run the CookSmart frontend prototype locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/TariqAlothman/Group-11-Project.git
cd Group-11-Project
```

### 2. Navigate to the Frontend directory
```bash
cd frontend
```

### 3. Install Dependencies
```bash
npm install
```

---

## 🚀 Usage Instructions

To launch the local development server and view the project:

### 1. Start the Server
```bash
npm run dev
```

### 2. View the App
Open your web browser and navigate to:
```text
http://localhost:5173
```

### Testing the Interfaces
Since this is a milestone frontend prototype heavily reliant on wireframes, you can explore the various routes manually. 

- The root URL (`/`) will automatically redirect you to the primary **`/browse`** page.
- You can freely navigate to the **User Settings**, **Admin Dashboard**, and **Chef Dashboard** by clicking the **Profile icon** located in the top-right corner of the application's Navbar.
- Look out for the **"Wireframe State Controls"** featured on specific pages (like *Cooking Mode* or *Favorites*). These buttons allow graders to quickly toggle the interface between different functional states (e.g., "In Progress" vs "Finished", or "Empty" vs "Populated").

---
*Created for KFUPM SWE363.*
