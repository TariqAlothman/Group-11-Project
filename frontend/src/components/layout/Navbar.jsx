import { useState } from "react";

import "./navbar.css";
import logo from "../../assets/images/cooksmart-logo.png";
function Navbar({user}) {
  const [DropDown, setDropDown] = useState(false); //Profile Dropdown


  // button handlers
  function handleProfileClick() {
    setDropDown(!DropDown);
    console.log("Profile clicked");
  }
  function handleLoginClick(){
    console.log("Login button clicked");
  }

  function handleBrowseClick(){
    console.log("Browse button clicked");
  }

  function handleRTCClick(){ // Ready To Cook handler
    console.log("Ready To Cook button clicked")
  }

  function handleFavoritesClick(){
    console.log("Favorites button clicked")
  }

  function handleSLClick(){
    console.log("Shopping List button clicked")
  }


  return (
    <nav className="navbar">
      

      <div className="logo">
        <img src={logo} alt="CookSmart logo" />
        <h1>CookSmart</h1>
      </div>

      <div className="pages">
        <button onClick={handleBrowseClick}>Browse</button>
        <button onClick={handleRTCClick}>Ready to Cook</button>
        <button onClick={handleFavoritesClick}>Favorites</button>
        <button onClick={handleSLClick}>Shopping List</button>
      </div>
      
      <div className="profile-area">
        {user ? (
          <>
            <button onClick={handleProfileClick}>
              {user.name}
            </button>
            {open && (
              <div className="dropdown">
                <button>Profile</button>
                <button>Settings</button>
                <button>Logout</button>
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