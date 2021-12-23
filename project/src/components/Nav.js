import React, { useState, useEffect } from "react";
import netflix_Logo from "../images/netflix_Logo.jpg";
import "../css/Nav.css";

function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_bar_black"}`}>
      <img className="nav_log" src={netflix_Logo} alt="Netflix Logo" />
    </div>
  );
}

export default Nav;
