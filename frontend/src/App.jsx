import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { clearAuthUser, getAuthUser } from "./utils/auth";
// authintication routes
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// errors routes
import Loading from "./pages/errors/Loading";
import Forbidden from "./pages/errors/Forbidden";
import NotFound from "./pages/errors/NotFound";
import ServerError from "./pages/errors/ServerError";

// users
import Browse from "./pages/public/Browse.jsx";
import CookingFlow from "./pages/public/CookingFlow.jsx";
import RecipeDetails from "./pages/public/RecipeDetails.jsx";
import Favorites from "./pages/user/Favorites.jsx";
import ShoppingList from "./pages/user/ShoppingList.jsx";
import CookingHistory from "./pages/user/CookingHistory.jsx";
import ReadyToCook from "./pages/user/ReadyToCook.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CookingMode from "./pages/user/CookingMode.jsx";
import ProfileSettings from "./pages/user/ProfileSettings.jsx";


//chef routes
import ChefDashboard from "./pages/chef/ChefDashboard.jsx";
import CreateRecipe from "./pages/chef/CreateRecipe.jsx";
import SubmissionStatus from "./pages/chef/SubmissionStatus.jsx";

//admin routes
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ReviewQueue from "./pages/admin/ReviewQueue.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageCategories from "./pages/admin/ManageCategories.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => getAuthUser());
  const location = useLocation();

  function handleLogout() {
    clearAuthUser();
    setUser(null);
  }

  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/loading",
    "/403",
    "/404",
    "/500",
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Navigate to="/browse" replace />} />

        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/loading" element={<Loading />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />

        <Route path="/browse" element={<Browse />} />
        <Route path="/cooking-flow" element={<Navigate to="/recipes/1/cooking-flow" replace />} />
        <Route path="/recipe-details" element={<Navigate to="/recipes/1" replace />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails key={location.pathname} />} />
        <Route path="/recipes/:recipeId/cooking-flow" element={<CookingFlow key={location.pathname} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/cooking-history" element={<CookingHistory />} />
        <Route path="/ready-to-cook" element={<ReadyToCook />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/cooking-mode" element={<CookingMode />} />
        <Route path="/profile-settings" element={<ProfileSettings user={user} />} />

        <Route path="/chef/dashboard" element={<ChefDashboard/>}/>
        <Route path="/chef/create-recipe" element={<CreateRecipe />} />
        <Route path="/chef/submissions" element={<SubmissionStatus />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/review-queue" element={<ReviewQueue />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-categories" element={<ManageCategories />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
