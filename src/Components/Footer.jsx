import React from "react";
import LogoImage from "../assets/gallery/logo.jpg";
import insta1 from "../assets/gallery/gellary_img1.jpg";
import insta2 from "../assets/gallery/gellary_img2.jpg";
import insta3 from "../assets/gallery/gellary_img3.jpg";
import insta4 from "../assets/gallery/gellary_img4.jpg";
import insta5 from "../assets/gallery/gellary_img5.jpg";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const instagramImages = [insta1, insta2, insta3, insta4, insta5];

  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        color: "white",
        paddingTop: "30px",
        paddingBottom: "20px",
      }}
    >
      <div className="container">
        <div
          className="row justify-content-between align-items-start text-center text-lg-start"
          style={{ rowGap: "30px" }}
        >
          {/* --- Logo and Description --- */}
          <div className="col-lg-4 d-flex flex-column align-items-center align-items-lg-start">
            <img
              src={LogoImage}
              alt="APS Residency Logo"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                marginBottom: "10px",
              }}
            />
            <span
              style={{
                color: "#A37D4C",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#b98e5c")}
              onMouseOut={(e) => (e.target.style.color = "#A37D4C")}
            >
              APS RESIDENCY
            </span>
            <p
              style={{
                color: "#ccc",
                fontSize: "14px",
                maxWidth: "250px",
                textAlign: "center",
                marginTop: "5px",
              }}
            >
              Luxurious stays and excellent service near popular attractions.
            </p>

            {/* Social Icons */}
            <div
              className="d-flex justify-content-center justify-content-lg-start mt-2"
              style={{ gap: "15px" }}
            >
              {[FaFacebookF, FaInstagram, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    color: "white",
                    transition: "color 0.3s",
                    fontSize: "18px",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#b98e5c")}
                  onMouseOut={(e) => (e.target.style.color = "white")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* --- Quick Links --- */}
          <div className="col-lg-3 d-flex flex-column align-items-center align-items-lg-start">
            <h6
              style={{
                color: "#A37D4C",
                fontWeight: "600",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Quick Links
            </h6>
            {["Home", "Rooms", "Amenities", "Gallery", "Contact"].map(
              (link, index) => (
                <button
                  key={index}
                  className="btn btn-link p-0 text-decoration-none"
                  style={{
                    color: "#ccc",
                    textAlign: "left",
                    fontSize: "14px",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#b98e5c")}
                  onMouseOut={(e) => (e.target.style.color = "#ccc")}
                  onClick={() => {
                    const section = document.getElementById(link.toLowerCase());
                    if (section)
                      section.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link}
                </button>
              )
            )}
          </div>

          {/* --- Instagram Gallery --- */}
          <div className="col-lg-4 d-flex flex-column align-items-center align-items-lg-start">
            <h6
              style={{
                color: "#A37D4C",
                fontWeight: "600",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Instagram
            </h6>
            <div className="d-flex flex-wrap" style={{ gap: "8px" }}>
              {instagramImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Instagram ${index + 1}`}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "6px",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- Copyright --- */}
        <div
          className="text-center mt-4 pt-3"
          style={{
            borderTop: "1px solid #444",
            color: "#aaa",
            fontSize: "13px",
          }}
        >
          &copy; {new Date().getFullYear()} APS Residency. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
