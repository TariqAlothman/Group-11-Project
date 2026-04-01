import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";

import Browse from "./pages/public/Browse.jsx";
import Favorites from "./pages/user/Favorites.jsx";
import ShoppingList from "./pages/user/ShoppingList.jsx";
import ReadyToCook from "./pages/ReadyToCook.jsx";
import Dashboard from "./pages/Dashboard.jsx";



// temp pages
function Home() {
  return <h1>Home Page</h1>;
}

function App() {
  const user = { name: "Tariq" };

  return (
    <>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/ready-to-cook" element={<ReadyToCook/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  );
}
export default App;