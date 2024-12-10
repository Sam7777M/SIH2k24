import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get the current URL path

  // Map route paths to button names
  const routeMap = {
    "/": "HOME",
    "/services": "SERVICES",
    "/dashboard": "DASHBOARD",
    "/contact": "CONTACT US",
    "/blog": "BLOG",
  };

  // Determine the active button based on the current path
  const active = routeMap[location.pathname] || "";

  return (
    <div
      style={{
        width: "1355px",
        height: "60px",
        top: "18px",
        left: "80px",
        position: "fixed",
        background: "rgba(0, 0, 0, 0.6)",
        borderRadius: "20px",
        opacity: "1",
        zIndex: "1000",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "0 20px",
      }}
    >
      {/* Navbar Links */}
      <Link
        to="/"
        style={{
          color: active === "HOME" ? "rgba(207, 90, 18, 1)" : "white",
          fontSize: "16px",
          padding: "10px 15px",
          fontWeight: active === "HOME" ? "bold" : "normal",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:text-orange-400"
      >
        HOME
      </Link>

      <Link
        to="/services"
        style={{
          color: active === "SERVICES" ? "rgba(207, 90, 18, 1)" : "white",
          fontSize: "16px",
          padding: "10px 15px",
          fontWeight: active === "SERVICES" ? "bold" : "normal",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:text-orange-400"
      >
        SERVICES
      </Link>

      <a
        href="#company"
        style={{
          color: active === "COMPANY" ? "rgba(207, 90, 18, 1)" : "white",
          fontSize: "16px",
          padding: "10px 15px",
          fontWeight: active === "COMPANY" ? "bold" : "normal",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:text-orange-400"
      >
        COMPANY <span style={{ fontSize: "12px", marginLeft: "5px" }}>▼</span>
      </a>

      {/* Logo */}
      <img
        src="/public/images/2.png"
        alt="Logo"
        style={{
          width: "200px",
          height: "200px",
          marginTop: "55px",
        }}
      />

      <Link
        to="/dashboard"
        style={{
          color: active === "DASHBOARD" ? "rgba(207, 90, 18, 1)" : "white",
          fontSize: "16px",
          padding: "10px 15px",
          fontWeight: active === "DASHBOARD" ? "bold" : "normal",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:text-orange-400"
      >
        DASHBOARD
      </Link>

      <Link
        to="/contact"
        style={{
          color: active === "CONTACT US" ? "rgba(207, 90, 18, 1)" : "white",
          fontSize: "16px",
          padding: "10px 15px",
          fontWeight: active === "CONTACT US" ? "bold" : "normal",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:text-orange-400"
      >
        CONTACT US
      </Link>

      <Link
        to="/blog"
        style={{
          color: active === "BLOG" ? "rgba(207, 90, 18, 1)" : "white",
          fontSize: "16px",
          padding: "10px 15px",
          fontWeight: active === "BLOG" ? "bold" : "normal",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        className="hover:text-orange-400"
      >
        BLOG
      </Link>
    </div>
  );
};

export default Navbar;
