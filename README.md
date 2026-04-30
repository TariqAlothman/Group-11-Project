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

To run the CookSmart application locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine, or access to a MongoDB Atlas cluster.

### 1. Clone the repository
```bash
git clone https://github.com/TariqAlothman/Group-11-Project.git
cd Group-11-Project
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory with the following **Environment Variables**:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cooksmart  # Or your MongoDB Atlas URI
   JWT_SECRET=supersecretkey_change_in_production
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will run on http://localhost:5000*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

---

## 📡 API Documentation

The backend RESTful API provides endpoints for authentication, recipes, user features, and administration. Below is the API structure.

### Authentication Endpoints
- **`POST /api/auth/register`**
  - **Body:** `{ name, email, password }`
  - **Description:** Registers a new standard user and returns a JWT token.
- **`POST /api/auth/login`** 
  - **Body:** `{ email, password }` 
  - **Description:** Authenticates a user and returns a JWT token.
- **`POST /api/auth/forgot-password`**
  - **Body:** `{ email }`
  - **Description:** Generates a password reset token. For local/class testing, the token is returned in the response.
- **`POST /api/auth/reset-password/:token`**
  - **Body:** `{ password }`
  - **Description:** Resets the user's password using a valid reset token and returns a JWT token.
- **`GET /api/auth/profile`** 
  - **Headers:** `Authorization: Bearer <token>`
  - **Description:** Retrieves the profile of the currently logged-in user.
- **`PUT /api/auth/profile`** *(Protected)*
  - **Body:** `{ name, email, currentPassword, password }`
  - **Description:** Updates the current user's profile. Password changes require the current password.

### Recipe Endpoints
- **`GET /api/recipes`** 
  - **Query:** `search`, `difficulty`, `category`
  - **Description:** Gets all publicly approved recipes, with optional filtering.
- **`GET /api/recipes/my-recipes`** *(Protected: Chef/Admin)*
  - **Query:** `status`
  - **Description:** Retrieves recipes created by the logged-in chef/admin.
- **`GET /api/recipes/:id`** 
  - **Description:** Gets a single recipe by ID. Pending recipes are visible only to the author, chefs, and admins.
- **`POST /api/recipes`** *(Protected: Chef/Admin)*
  - **Body:** `{ title, description, ingredients, instructions, prepTime, cookTime, category, servings }`
  - **Description:** Creates a new recipe (starts as "Pending").
- **`PUT /api/recipes/:id`** *(Protected: Chef/Admin)*
  - **Description:** Updates an existing recipe.
- **`DELETE /api/recipes/:id`** *(Protected: Chef/Admin)*
  - **Description:** Removes a recipe from the database.
- **`POST /api/recipes/:id/like`** *(Protected)*
  - **Description:** Likes an approved recipe.
- **`DELETE /api/recipes/:id/like`** *(Protected)*
  - **Description:** Removes the current user's like from a recipe.
- **`POST /api/recipes/:id/comments`** *(Protected)*
  - **Body:** `{ text }`
  - **Description:** Adds a comment to an approved recipe.
- **`DELETE /api/recipes/:id/comments/:commentId`** *(Protected)*
  - **Description:** Deletes a comment owned by the current user, or any comment as admin.

### User Endpoints
- **`GET /api/users/favorites`** *(Protected: User)*
  - **Description:** Retrieves user's favorite recipes.
- **`POST /api/users/favorites`** *(Protected: User)*
  - **Body:** `{ recipeId }`
  - **Description:** Adds a recipe to the favorites list.
- **`DELETE /api/users/favorites/:recipeId`** *(Protected: User)*
  - **Description:** Removes a recipe from the favorites list.
- **`GET /api/users/shopping-list`** *(Protected: User)*
  - **Description:** Retrieves dynamic shopping list.
- **`POST /api/users/shopping-list`** *(Protected: User)*
  - **Body:** `{ item, quantity }`
  - **Description:** Adds an item to the shopping list.
- **`PUT /api/users/shopping-list/:itemId`** *(Protected: User)*
  - **Body:** `{ status }`
  - **Description:** Updates a shopping list item status.
- **`DELETE /api/users/shopping-list/:itemId`** *(Protected: User)*
  - **Description:** Removes a shopping list item.
- **`DELETE /api/users/shopping-list/completed`** *(Protected: User)*
  - **Description:** Clears completed shopping list items.
- **`GET /api/users/history`** *(Protected: User)*
  - **Description:** Retrieve user past cooked history.
- **`POST /api/users/history`** *(Protected: User)*
  - **Body:** `{ recipeId }`
  - **Description:** Adds a cooked recipe to user history.

### Admin Endpoints
- **`GET /api/admin/stats`** *(Protected: Admin)*
  - **Description:** Retrieves dashboard counts for users, recipes, and categories.
- **`GET /api/admin/recipes/pending`** *(Protected: Admin)*
  - **Description:** Retrieves all recipes waiting for administrator approval.
- **`PATCH /api/admin/recipes/:id/status`** *(Protected: Admin)*
  - **Body:** `{ status: "Approved" | "Rejected" }`
  - **Description:** Updates the moderation status of a recipe.
- **`GET /api/admin/users`** *(Protected: Admin)*
  - **Description:** Lists all active users in the system.
- **`PATCH /api/admin/users/:id/role`** *(Protected: Admin)*
  - **Body:** `{ role: "user" | "chef" | "admin" }`
  - **Description:** Updates a user's role.
- **`PATCH /api/admin/users/:id/suspension`** *(Protected: Admin)*
  - **Body:** `{ isSuspended: true | false }`
  - **Description:** Suspends or unsuspends a user account.
- **`DELETE /api/admin/users/:id`** *(Protected: Admin)*
  - **Description:** Deletes a user account.
- **`GET /api/admin/categories`**
  - **Description:** Lists all categories.
- **`POST /api/admin/categories`** *(Protected: Admin)*
  - **Body:** `{ name, description }`
  - **Description:** Creates a new food category tag.
- **`PUT /api/admin/categories/:id`** *(Protected: Admin)*
  - **Body:** `{ name, description, image }`
  - **Description:** Updates a food category tag.
- **`DELETE /api/admin/categories/:id`** *(Protected: Admin)*
  - **Description:** Deletes a category and clears it from existing recipes.

---
*Created for KFUPM SWE363.*
