import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LogoImage from "../assets/logo-removebg-preview.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const [header, setHeader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setHeader(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section or redirect to home
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      // if user is not on home, go to home with section hash
      window.location.href = `/#${id}`;
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -70;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const bgColor = isMobile ? "#fff" : header ? "#fff" : "transparent";

  const navItemStyle = {
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.95rem",
    fontWeight: "500",
    textTransform: "uppercase",
    transition: "color 0.3s ease",
    position: "relative",
    padding: "0.5rem 1rem",
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = "#A37D4C";
    e.target.style.setProperty("--underline-width", "100%");
  };
  const handleMouseLeave = (e, color) => {
    e.target.style.color = color;
    e.target.style.setProperty("--underline-width", "0%");
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: bgColor,
        padding: header ? "0.5rem 1rem" : "1rem 1rem",
        boxShadow: header || isMobile ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        zIndex: 1030,
        transition: "all 0.3s",
      }}
    >
      <div className="container">
        {/* ✅ Logo always links to home */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <img
            src={LogoImage}
            alt="Hotel Logo"
            className="me-2"
            width="50"
            height="50"
            style={{ objectFit: "contain" }}
          />
          <span
            style={{
              color: "#A37D4C",
              fontWeight: 700,
              fontSize: "1.2rem",
            }}
          >
            APS RESIDENCY
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav text-uppercase fw-semibold">
            {[
              { label: "Home", id: "hero" },
              { label: "Rooms", path: "/rooms" },
              { label: "Amenities", id: "amenities" },
              { label: "Gallery", id: "gallery" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <li key={item.label} className="nav-item">
                {item.path ? (
                  // 🏨 If it's Rooms link
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    style={{
                      ...navItemStyle,
                      color: header || isMobile ? "#000" : "#fff",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={(e) =>
                      handleMouseLeave(e, header || isMobile ? "#000" : "#fff")
                    }
                  >
                    {item.label}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        height: "2px",
                        width: "var(--underline-width, 0%)",
                        backgroundColor: "#A37D4C",
                        transition: "width 0.3s ease",
                        display: "block",
                      }}
                    ></span>
                  </Link>
                ) : (
                  // 🏡 All other links
                  location.pathname === "/rooms" ? (
                    // 🟡 When on Rooms page: redirect to home
                    <Link
                      to="/"
                      className="nav-link"
                      style={{
                        ...navItemStyle,
                        color: header || isMobile ? "#000" : "#fff",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={(e) =>
                        handleMouseLeave(e, header || isMobile ? "#000" : "#fff")
                      }
                    >
                      {item.label}
                      <span
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "0",
                          height: "2px",
                          width: "var(--underline-width, 0%)",
                          backgroundColor: "#A37D4C",
                          transition: "width 0.3s ease",
                          display: "block",
                        }}
                      ></span>
                    </Link>
                  ) : (
                    // 🟢 On Home page or other pages: scroll
                    <span
                      onClick={() => scrollToSection(item.id)}
                      className="nav-link"
                      style={{
                        ...navItemStyle,
                        color: header || isMobile ? "#000" : "#fff",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={(e) =>
                        handleMouseLeave(e, header || isMobile ? "#000" : "#fff")
                      }
                    >
                      {item.label}
                      <span
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "0",
                          height: "2px",
                          width: "var(--underline-width, 0%)",
                          backgroundColor: "#A37D4C",
                          transition: "width 0.3s ease",
                          display: "block",
                        }}
                      ></span>
                    </span>
                  )
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
