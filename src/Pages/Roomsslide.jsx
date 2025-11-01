import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// === Import Room Images ===
import familyRoom1 from "../assets/Family Room/DSC08906.jpg";
import familyRoom2 from "../assets/Family Room/DSC08911.jpg";
import familyRoom3 from "../assets/Family Room/DSC08920.jpg";
import familyRoom4 from "../assets/Family Room/DSC08929.jpg";
import familyRoom5 from "../assets/Family Room/DSC08936.jpg";
import familyRoom6 from "../assets/Family Room/DSC09215.jpg";

import hillViewSuite1 from "../assets/Hill View Suite Room With Balcony/DSC08735.jpg";
import hillViewSuite2 from "../assets/Hill View Suite Room With Balcony/DSC08822.jpg";
import hillViewSuite3 from "../assets/Hill View Suite Room With Balcony/DSC08823.jpg";
import hillViewSuite4 from "../assets/Hill View Suite Room With Balcony/DSC08841.jpg";
import hillViewSuite5 from "../assets/Hill View Suite Room With Balcony/DSC08844.jpg";
import hillViewSuite6 from "../assets/Hill View Suite Room With Balcony/DSC08890.jpg";
import hillViewSuite7 from "../assets/Hill View Suite Room With Balcony/DSC09215.jpg";

import premiumHillView1 from "../assets/Premium Hill View Rooms/DSC09005.jpg";
import premiumHillView2 from "../assets/Premium Hill View Rooms/DSC09013.jpg";
import premiumHillView3 from "../assets/Premium Hill View Rooms/DSC09215.jpg";
import premiumHillView4 from "../assets/Premium Hill View Rooms/IMG_5079.jpg";
import premiumHillView5 from "../assets/Premium Hill View Rooms/IMG_5085.jpg";
import premiumHillView6 from "../assets/Premium Hill View Rooms/IMG_5096.jpg";
import premiumHillView7 from "../assets/Premium Hill View Rooms/IMG_5105.jpg";

import premiumRoom1 from "../assets/Premium Room/DSC08906.jpg";
import premiumRoom2 from "../assets/Premium Room/DSC08911.jpg";
import premiumRoom3 from "../assets/Premium Room/DSC09021.jpg";
import premiumRoom4 from "../assets/Premium Room/DSC09024.jpg";
import premiumRoom5 from "../assets/Premium Room/DSC09215.jpg";
import premiumRoom6 from "../assets/Premium Room/IMG_5132.jpg";

import standardRoom1 from "../assets/Standard Room/DSC09133.jpg";
import standardRoom2 from "../assets/Standard Room/DSC09146.jpg";
import standardRoom3 from "../assets/Standard Room/DSC09152.jpg";
import standardRoom4 from "../assets/Standard Room/DSC09157.jpg";
import standardRoom5 from "../assets/Standard Room/DSC09215.jpg";

import suiteBalcony1 from "../assets/Suite Room With Balcony/DSC08735.jpg";
import suiteBalcony2 from "../assets/Suite Room With Balcony/DSC09079.jpg";
import suiteBalcony3 from "../assets/Suite Room With Balcony/DSC09094.jpg";
import suiteBalcony4 from "../assets/Suite Room With Balcony/DSC09097.jpg";
import suiteBalcony5 from "../assets/Suite Room With Balcony/DSC09111.jpg";
import suiteBalcony6 from "../assets/Suite Room With Balcony/DSC09118.jpg";
import suiteBalcony7 from "../assets/Suite Room With Balcony/DSC09215.jpg";

import terraceHillView1 from "../assets/Terrace Hill View Room/DSC08716.jpg";
import terraceHillView2 from "../assets/Terrace Hill View Room/DSC08720.jpg";
import terraceHillView3 from "../assets/Terrace Hill View Room/DSC08727.jpg";
import terraceHillView4 from "../assets/Terrace Hill View Room/DSC08737.jpg";
import terraceHillView5 from "../assets/Terrace Hill View Room/DSC08748.jpg";
import terraceHillView6 from "../assets/Terrace Hill View Room/DSC08756.jpg";
import terraceHillView7 from "../assets/Terrace Hill View Room/DSC08770.jpg";
import terraceHillView8 from "../assets/Terrace Hill View Room/DSC09215.jpg";


import { Link } from "react-router-dom";


const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const rooms = [
    {
      name: "Standard Room",
      guests: "Up to 2 guests",
      images: [standardRoom1, standardRoom2, standardRoom3, standardRoom4, standardRoom5],
      description:
        "Comfortable and well-appointed room featuring modern amenities and city views. Perfect for business travelers and couples seeking quality accommodation at great value.",
      amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Safe"],
    },
    {
      name: "Premium Room",
      guests: "Up to 2 guests",
      images: [premiumRoom1, premiumRoom2, premiumRoom3, premiumRoom4, premiumRoom5, premiumRoom6],
      description:
        "Elegant premium room with enhanced furnishings and modern amenities. Features plush bedding and a relaxing atmosphere.",
      amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Safe"],
    },
    {
      name: "Family Room",
      guests: "Up to 4 guests",
      images: [familyRoom1, familyRoom2, familyRoom3, familyRoom4, familyRoom5, familyRoom6],
      description:
        "Spacious family room designed for comfort and convenience. Ideal for families or small groups.",
      amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Safe"],
    },
    {
      name: "Suite Room with Balcony",
      guests: "Up to 3 guests",
      images: [suiteBalcony1, suiteBalcony2, suiteBalcony3, suiteBalcony4, suiteBalcony5, suiteBalcony6, suiteBalcony7],
      description:
        "Luxurious suite featuring a private balcony with stunning views. Perfect for guests who want a premium stay experience.",
      amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Safe"],
    },
    {
      name: "Premium Hill View Room",
      guests: "Up to 2 guests",
      images: [premiumHillView1, premiumHillView2, premiumHillView3, premiumHillView4, premiumHillView5, premiumHillView6, premiumHillView7],
      description:
        "Premium room with breathtaking hill views and modern luxury. Wake up to scenic landscapes every morning.",
      amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Safe"],
    },
    {
      name: "Hill View Suite Room with Balcony",
      guests: "Up to 4 guests",
      images: [hillViewSuite1, hillViewSuite2, hillViewSuite3, hillViewSuite4, hillViewSuite5, hillViewSuite6, hillViewSuite7],
      description:
        "Exclusive hill view suite with private balcony offering panoramic vistas. Experience luxury and tranquility.",
      amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Safe"],
    },
    {
      name: "Terrace Hill View Room",
      guests: "Up to 3 guests",
      images: [terraceHillView1, terraceHillView2, terraceHillView3, terraceHillView4, terraceHillView5, terraceHillView6, terraceHillView7, terraceHillView8],
      description:
        "Unique terrace room with private outdoor space and magnificent hill views. Perfect for couples and small families.",
      amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Safe"],
    },
  ];

  const handleView = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

const nextImage = () => {
  setCurrentIndex((prev) =>
    prev === selectedRoom.images.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? selectedRoom.images.length - 1 : prev - 1
  );
};


  const ImageCarousel = ({ images }) => {
    const [i, setI] = useState(0);

    return (
      <div id="rooms" className="position-relative text-center">
        <img
          src={images[i]}
          alt=""
          className="img-fluid rounded"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setI(i === 0 ? images.length - 1 : i - 1)}
              className="btn btn-light position-absolute start-0 top-50 translate-middle-y rounded-circle shadow border-0"
            >
              ‹
            </button>
            <button
              onClick={() => setI(i === images.length - 1 ? 0 : i + 1)}
              className="btn btn-light position-absolute end-0 top-50 translate-middle-y rounded-circle shadow border-0"
            >
              ›
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div id="room" className="container my-5">
      <h2 className="text-center mb-3 fw-bold">Our Rooms</h2>
      <p className="text-center mb-4 text-muted">
        Choose from carefully designed accommodations, each offering unique comfort and style
      </p>

      <div className="row g-4">
        {rooms.map((room, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "12px" }}>
              <img
                src={room.images[0]}
                alt={room.name}
                className="card-img-top"
                style={{ height: "190px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold" style={{ fontSize: "1.05rem" }}>
                  {room.name}
                </h5>

                <p className="text-muted flex-grow-1" style={{ fontSize: "0.9rem" }}>
                  {room.description.substring(0, 85)}...
                </p>

                <button
                  className="btn mt-auto"
                  style={{
                    backgroundColor: "#A37D4C",
                    color: "white",
                    borderRadius: "6px",
                    fontWeight: "500",
                  }}
                  onClick={() => handleView(room)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

   {showModal && selectedRoom && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.65)" }}
  >
    <div className="modal-dialog modal-xl modal-dialog-centered">
      <div className="modal-content border-0 rounded-4 overflow-hidden">

        {/* ---- HEADER ---- */}
        <div className="modal-header border-0 px-4 pt-4">
          <h4 className="fw-bold mb-0">{selectedRoom.name}</h4>
          <button className="btn-close" onClick={handleCloseModal}></button>
        </div>

        {/* ---- BODY ---- */}
        <div className="modal-body px-4 pb-4">
          <div className="row align-items-start">

            {/* LEFT IMAGE + ARROWS */}
            <div className="col-md-6">
              <div className="position-relative">
                <img
                  src={selectedRoom.images[currentIndex]}
                  className="img-fluid rounded-3"
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                  alt=""
                />

                {/* Prev */}
                <button
                  onClick={prevImage}
                  className="btn bg-white shadow position-absolute start-0 top-50 translate-middle-y rounded-circle"
                  style={{ width: "38px", height: "38px" }}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                {/* Next */}
                <button
                  onClick={nextImage}
                  className="btn bg-white shadow position-absolute end-0 top-50 translate-middle-y rounded-circle"
                  style={{ width: "38px", height: "38px" }}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="col-md-6 mt-3 mt-md-0">
              <div className="d-flex align-items-center gap-3 mb-2 text-muted">
                <span><i className="bi bi-bed me-1"></i> Queen Bed</span>
                <span><i className="bi bi-people me-1"></i> {selectedRoom.guests}</span>
              </div>

              <h6 className="fw-bold">Description</h6>
              <p style={{ fontSize: "14px" }}>{selectedRoom.description}</p>

              <h6 className="fw-bold">Amenities</h6>
              <div className="row">
                {selectedRoom.amenities.map((a, i) => (
                  <div className="col-6 mb-2" key={i}>
                    <i className="bi bi-check-circle text-success me-2"></i>
                    {a}
                  </div>
                ))}
              </div>

              {/* ---- BOOK NOW BUTTON ---- */}
              <div className="mt-3">
               <Link to="/rooms">
  <button
    className="btn text-white fw-semibold w-100 py-2"
    style={{
      borderRadius: "8px",
      background: "linear-gradient(to right, #d4af37, #c89b1b)",
      fontSize: "14px",
    }}
  >
    Book Now
  </button>
</Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Rooms;
