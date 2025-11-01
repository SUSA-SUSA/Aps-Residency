import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { FaWifi, FaParking, FaSnowflake, FaStopwatch } from "react-icons/fa";

const Amenities = () => {
  const facilities = [
    { name: "Wifi", icon: FaWifi, desc: "Dedicated Wi-Fi in each room." },
    { name: "Parking Space", icon: FaParking, desc: "Ample on-site parking." },
    { name: "Air Conditioner", icon: FaSnowflake, desc: "Comfortable air-conditioned rooms." },
    { name: "Power Backup 24/7", icon: FaStopwatch, desc: "Uninterrupted services." },
  ];

  return (
    <section id="amenities" className="py-5 bg-white text-center">
      <div className="container">
        <h2 className="display-5 mb-4">Amenities At Hotel</h2>
        <p className="text-muted mb-5">
          We offer luxurious amenities designed to make your stay unforgettable.
        </p>
        <div className="row g-4">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm p-4 d-flex flex-column align-items-center justify-content-start"
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "60px",
                      height: "60px",
                      marginBottom: "1rem",
                      fontSize: "2rem",
                      color: "#ffc107",
                    }}
                  >
                    <Icon />
                  </div>
                  <h5 className="card-title">{facility.name}</h5>
                  <p className="card-text text-muted">{facility.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
