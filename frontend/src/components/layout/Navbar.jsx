import { useState } from "react";

import "./navbar.css";
import logo from "../../assets/icons/cooksmart-logo.png";
import userIcon from "../../assets/icons/user-icon.svg";
import dropDownIcon from "../../assets/icons/dropdown-icon.svg";
import Button from "../ui/Button";
import { useNavigate, useLocation } from "react-router-dom";


function Navbar({user}) {
  const [dropDown, setDropDown] = useState(false); //Profile Dropdown
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // button handlers

  function handleLogoClick(){
    console.log("Logo clicked")
  }
  function handleUsernameClick() { // if he clicks the username 
    setDropDown(!dropDown);        // dropout menu for settings etc..
    console.log("Username clicked");
  }
  function handleLoginClick(){
    navigate("/login");
  }

  function handleBrowseClick(){
    navigate("/browse");
    console.log("Browse button clicked");
  }

  function handleReadyToCookClick(){ // Ready To Cook handler
    navigate("/ready-to-cook");
    console.log("Ready To Cook button clicked");
  }

  function handleFavoritesClick(){
    navigate("/favorites");
    console.log("Favorites button clicked");
  }

  function handleShoppingListClick(){ // shopping list handler
    navigate("/shopping-list");
    console.log("Shopping List button clicked");
  }

  function handleProfileClick(){
    console.log("Profile clicked");
  }

  function handleDashboardClick(){
    navigate("/dashboard")
    console.log("Dashboard clicked")
  }

  function handleSettingsClick(){
    console.log("Settings clicked");
  }

  function handleLogoutClick(){
    navigate("/login");
  }


  return (
    <nav className="navbar">

      <div className="logo">
        <button onClick={handleLogoClick}>
        <img src={logo} alt="CookSmart logo" />
        <h1>CookSmart</h1>
        </button>
      </div>

      <div className="pages">
        {isAdminRoute ? (
          <>
            <Button onClick={() => navigate("/admin/dashboard")} variant="nav-page">
              Dashboard
            </Button>
            <Button onClick={() => navigate("/admin/review-queue")} variant="nav-page">
              Review Queue
            </Button>
            <Button onClick={() => navigate("/admin/manage-users")} variant="nav-page">
              Manage Users
            </Button>
            <Button onClick={() => navigate("/admin/manage-categories")} variant="nav-page">
              Manage Categories
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleBrowseClick} variant ="nav-page">
              Browse
            </Button>
            <Button onClick={handleReadyToCookClick} variant="nav-page">
              Ready to Cook
            </Button>
            <Button onClick={handleFavoritesClick} variant="nav-page">
              Favorites
            </Button>
            <Button onClick={handleShoppingListClick} variant="nav-page">
              Shopping List
            </Button>
          </>
        )}
      </div>
      
      <div className={`profile-area ${dropDown ? "open" : ""}`}>
        {user ? (
          <>
            <Button onClick={handleUsernameClick}>
              {/* this is the profile icon left of username on the top right */}
              <svg className="icon" width="20" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M12.6636 13.9966V12.6636C12.6636 11.9565 12.3827 11.2784 11.8827 10.7784C11.3827 10.2784 10.7046 9.99756 9.99756 9.99756H5.99854C5.29146 9.99756 4.61335 10.2784 4.11338 10.7784C3.6134 11.2784 3.33252 11.9565 3.33252 12.6636V13.9966" stroke="#F54900" strokeWidth="1.33301" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.99805 7.33154C9.47045 7.33154 10.6641 6.13793 10.6641 4.66553C10.6641 3.19313 9.47045 1.99951 7.99805 1.99951C6.52565 1.99951 5.33203 3.19313 5.33203 4.66553C5.33203 6.13793 6.52565 7.33154 7.99805 7.33154Z" stroke="#F54900" strokeWidth="1.33301" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="username">
                {user.name}
              </span>
                {/* this is the dropdown arrow right of username on the top right */}
              <svg className= {`arrow ${dropDown ? "open" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.99902 5.99854L7.99805 9.99756L11.9971 5.99854" stroke="#F54900" strokeWidth="1.33301" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* <img scr={dropDownIcon} className={`arrow ${dropDown ? "open" : ""}`} alt="icon"/> */}
              </Button>
            {dropDown && (    // checks if the dropdown is open then show the dropdown
              <div className="dropdown">
                <Button onClick={handleProfileClick} className="drop">Profile</Button>
                <Button onClick={handleDashboardClick}>DashBoard</Button>
                <Button onClick={() => navigate("/admin/dashboard")}>Admin Dashboard</Button>
                <Button onClick={handleSettingsClick}>Settings</Button>
                <Button onClick={handleLogoutClick}>Logout</Button>
              </div>
              )


            }
          </>
        ) : (
        <button onClick={handleLoginClick}>Login/SignUp</button>
          )
        }
      </div>

    </nav>
  );
}

export default Navbar;