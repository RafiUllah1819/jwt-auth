import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <header>
   
        <nav className="navbar navbar-expand-md px-5">
          <Link className="navbar-brand text-white" to="/">
            MERN APP
          </Link>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};
