import Navbar from "./components/layout/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Loading from "./pages/errors/Loading";
import Forbidden from "./pages/errors/Forbidden";
import NotFound from "./pages/errors/NotFound";
import ServerError from "./pages/errors/ServerError";

import Browse from "./pages/public/Browse.jsx";
import RecipeDetails from "./pages/public/RecipeDetails.jsx";
import Favorites from "./pages/user/Favorites.jsx";
import ShoppingList from "./pages/user/ShoppingList.jsx";
import CookingHistory from "./pages/user/CookingHistory.jsx";
import ReadyToCook from "./pages/user/ReadyToCook.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ChefDashboard from "./pages/chef/ChefDashboard.jsx";
import CreateRecipe from "./pages/chef/CreateRecipe.jsx";
import SubmissionStatus from "./pages/chef/SubmissionStatus.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ReviewQueue from "./pages/admin/ReviewQueue.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageCategories from "./pages/admin/ManageCategories.jsx";
import "./App.css";

function Home() {
  return <h1>Home Page</h1>;
}

function App() {
  const user = { name: "Tariq" };
  const location = useLocation();

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
      {shouldShowNavbar && <Navbar user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/loading" element={<Loading />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />

        <Route path="/browse" element={<Browse />} />
        <Route path="/recipe-details" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/cooking-history" element={<CookingHistory />} />
        <Route path="/ready-to-cook" element={<ReadyToCook />} />
        <Route path="/dashboard" element={<Dashboard />} />

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
